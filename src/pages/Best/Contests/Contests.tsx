import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import route from "../../../router/route.json";
import styles from "./Contests.module.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import { ProductType } from "../../../context/ProductType";
import { BEST_AD_SLOT } from "../../../models/constants/adsSlot";
import { ProductPages } from "../../../models/enum/pages";
import { enforcePageAccess } from "../../../utils/navigation";
import { useContentContext } from "../../../context/ContentContext";

function Contests() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = useContentContext();

  const bestHomePagePath = route[`bestHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.bestHomePageEn;

  useEffect(() => {
    enforcePageAccess(
      currentPage,
      setCurrentPage,
      ProductPages.PAGE_WordsTopic,
      navigate,
      bestHomePagePath
    );
  }, []);

  return (
    <PageLayout
      id="bestContests"
      productType={ProductType.Best}
      hasGreenBackground
      hasHeader={{ hasTitle: t("best.contests.pageTitle") }}
      hasAds={BEST_AD_SLOT}
      hasNavBar
      index={false}
    >
      <div className={styles.hof_container}>
        {/* כאן נכניס את תוכן התחרויות' */}
      </div>
    </PageLayout>
  );
}

export default Contests;
