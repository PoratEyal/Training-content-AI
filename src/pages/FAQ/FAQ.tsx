import React, { useMemo } from "react";
import styles from "./FAQ.module.css";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import { buildFaqSchema } from "../../models/schemaOrg";

const FQA: React.FC = () => {
  const { t, i18n } = useTranslation();

  const faq = t("faq.questions", { returnObjects: true }) as {
    q: string;
    a: string;
  }[];

  const faqSchema = useMemo(() => buildFaqSchema(faq), [faq]);

  const title = t("faq.title");
  const dir = i18n.dir();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <PageLayout
      id="faq"
      path={route.faq || (i18n.language === "en" ? "/en/faq" : "/faq")}
      hasHeader={{ goBack, isBlur: true }}
      index={true}
    >

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <div className={styles.faq_article} style={{ direction: dir }}>
        <h1 className={styles.faq_title}>{title}</h1>

        {faq.map(({ q, a }, idx) => (
          <div className={styles.faq_item} key={idx}>
            <div className={styles.faq_q}>{q}</div>
            <div className={styles.faq_a}>{a}</div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default FQA;
