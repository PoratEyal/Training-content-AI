# This Python script is intended for fetching data from Google Search Console
# bulk_url_inspect.py
# Bulk URL Inspection via Google Search Console URL Inspection API
# Requires: client_secrets.json in the same folder as this script
# Install deps:
#   pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib pandas requests
# To Run:
#   python scripts/bulk_url_inspect.py --site-url https://activitywiz.com/ --sitemap https://activitywiz.com/sitemap.xml


import argparse
import os
import sys
import time
import xml.etree.ElementTree as ET
from io import StringIO
import requests
import pandas as pd

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

def auth():
    creds = None
    token_path = os.path.join(os.path.dirname(__file__), "token.json")
    secrets_path = os.path.join(os.path.dirname(__file__), "client_secrets.json")

    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(requests.Request())  # type: ignore
        else:
            flow = InstalledAppFlow.from_client_secrets_file(secrets_path, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, "w") as f:
            f.write(creds.to_json())
    return creds

def load_urls_from_txt(path):
    with open(path, "r", encoding="utf-8") as f:
        return [ln.strip() for ln in f if ln.strip()]

def fetch(url, timeout=30):
    r = requests.get(url, timeout=timeout, headers={"User-Agent": "Bulk-URL-Inspection/1.0"})
    r.raise_for_status()
    return r.text

def parse_sitemap(xml_text):
    urls = []
    root = ET.parse(StringIO(xml_text)).getroot()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for loc in root.findall(".//sm:sitemap/sm:loc", ns):
        try:
            child_xml = fetch(loc.text.strip())
            urls.extend(parse_sitemap(child_xml))
        except Exception:
            continue
    for loc in root.findall(".//sm:url/sm:loc", ns):
        urls.append(loc.text.strip())
    return list(dict.fromkeys(urls))

def read_input(args):
    if args.sitemap:
        xml_text = fetch(args.sitemap)
        return parse_sitemap(xml_text)
    if args.urls:
        return load_urls_from_txt(args.urls)
    print("Provide --sitemap or --urls", file=sys.stderr)
    sys.exit(2)

def safe_get(d, path, default=""):
    cur = d
    for key in path:
        if not isinstance(cur, dict) or key not in cur:
            return default
        cur = cur[key]
    return cur

def main():
    parser = argparse.ArgumentParser(description="Bulk URL Inspection (GSC API)")
    parser.add_argument("--site-url", required=True, help="Search Console property (URL-prefix or sc-domain:example.com)")
    parser.add_argument("--sitemap", help="Sitemap or sitemap index URL")
    parser.add_argument("--urls", help="Path to urls.txt (one URL per line)")
    parser.add_argument("--out", default="results.csv", help="Output CSV filename")
    parser.add_argument("--sleep", type=float, default=0.6, help="Seconds to sleep between API calls")
    args = parser.parse_args()

    urls = read_input(args)
    if not urls:
        print("No URLs to process", file=sys.stderr)
        sys.exit(1)

    creds = auth()
    service = build("searchconsole", "v1", credentials=creds, cache_discovery=False)

    rows = []
    for i, u in enumerate(urls, 1):
        body = {"inspectionUrl": u, "siteUrl": args.site_url, "languageCode": "en-US"}
        try:
            resp = service.urlInspection().index().inspect(body=body).execute()
            r = safe_get(resp, ["inspectionResult", "indexStatusResult"], {})
            rows.append({
                "url": u,
                "verdict": r.get("verdict", ""),
                "coverageState": r.get("coverageState", ""),
                "robotsTxtState": r.get("robotsTxtState", ""),
                "indexingState": r.get("indexingState", ""),
                "pageFetchState": r.get("pageFetchState", ""),
                "lastCrawlTime": r.get("lastCrawlTime", ""),
                "canonicalUrl_user": r.get("userCanonical", ""),
                "canonicalUrl_google": r.get("googleCanonical", ""),
                "sitemaps": ",".join(r.get("sitemap", [])) if isinstance(r.get("sitemap", []), list) else r.get("sitemap", ""),
            })
        except HttpError as e:
            status = getattr(e, "status_code", None) or (e.resp.status if hasattr(e, "resp") else "")
            rows.append({"url": u, "verdict": f"ERROR_{status}", "coverageState": "", "robotsTxtState": "", "indexingState": "", "pageFetchState": "", "lastCrawlTime": "", "canonicalUrl_user": "", "canonicalUrl_google": "", "sitemaps": ""})
            if status in (429, 403, 500, 503):
                time.sleep(5)
        except Exception:
            rows.append({"url": u, "verdict": "ERROR", "coverageState": "", "robotsTxtState": "", "indexingState": "", "pageFetchState": "", "lastCrawlTime": "", "canonicalUrl_user": "", "canonicalUrl_google": "", "sitemaps": ""})
        time.sleep(args.sleep)

    df = pd.DataFrame(rows)
    df.to_csv(args.out, index=False, encoding="utf-8")
    print(f"Done. Wrote {args.out} with {len(rows)} rows.")

if __name__ == "__main__":
    main()
