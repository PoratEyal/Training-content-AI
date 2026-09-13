//
// This is an admin-only Status page
// It allows logged-in users to fetch users or activities data from the backend
// The fetched data is converted to CSV and downloaded as a file
// The result status is displayed below the buttons
//
import { useState } from "react";
import { fetchGetActivities, fetchGetUsers } from "../../../utils/fetch";
import { useAuthContext } from "../../../context/AuthContext";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Helmet } from "react-helmet-async";

export const jsonToCsv = (json: any, fileName: string) => {
    const rows = Array.isArray(json) ? json : [];
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
};

function Status() {
    const { isLoggedIn, loading } = useAuthContext();
    const [res, setRes] = useState<string>("");
    const [busy, setBusy] = useState(false);

    const handleClickUsers = async () => {
        setBusy(true);
        setRes("loading...");
        try {
            const response = await fetchGetUsers();
            const users = Array.isArray(response.users) ? response.users : [];
            setRes(`${response.result} (${users.length} users)`);
            jsonToCsv(users, "users");
        } catch (error) {
            console.error(error);
            setRes(error instanceof Error ? error.message : "Failed to export users");
        } finally {
            setBusy(false);
        }
    };

    const handleClickActivities = async () => {
        setBusy(true);
        setRes("loading...");
        try {
            const response = await fetchGetActivities();
            const activities = Array.isArray(response.activities) ? response.activities : [];
            setRes(`${response.result} (${activities.length} activities)`);
            jsonToCsv(activities, "activities");
        } catch (error) {
            console.error(error);
            setRes(error instanceof Error ? error.message : "Failed to export activities");
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            <article
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                {loading ? (
                    <p>loading...</p>
                ) : isLoggedIn ? (
                    <>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <button type="button" onClick={handleClickUsers} disabled={busy}>
                                users
                            </button>
                            <button type="button" onClick={handleClickActivities} disabled={busy}>
                                activities
                            </button>
                        </div>
                        <p>{res}</p>
                    </>
                ) : (
                    <p>Sign in first, then open /status again to export data.</p>
                )}
            </article>
        </>
    );
}

export default Status;
