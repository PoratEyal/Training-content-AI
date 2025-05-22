import React from "react";
import styles from "./FQA.module.css";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";

const FQA: React.FC = () => {
  const { t, i18n } = useTranslation();
  const faq = t("faq.questions", { returnObjects: true }) as {
    q: string;
    a: string;
  }[];
  const title = t("faq.title");
  const dir = i18n.dir();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <PageLayout
      id="faq"
      path={route.faq || (i18n.language === "en" ? "/en/faq" : "/faq")}
      hasHeader={{ goBack, isBlur: true }}
      index={false}
    >
      <div className={styles.faq_article} style={{ direction: dir }}>
        <h1 className={styles.faq_title}>{title}</h1>
        {Array.isArray(faq) &&
          faq.map((item, idx) => (
            <div className={styles.faq_item} key={idx}>
              <div className={styles.faq_q}>{item.q}</div>
              <div className={styles.faq_a}>{item.a}</div>
            </div>
          ))}
      </div>
    </PageLayout>
  );
};

export default FQA;
