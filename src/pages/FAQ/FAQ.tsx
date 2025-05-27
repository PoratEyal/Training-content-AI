import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./FAQ.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { buildFaqSchema } from "../../models/schemaOrg";

const FAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dir = i18n.dir();

  const faq = t("faq.questions", { returnObjects: true }) as {
    q: string;
    a: string;
  }[];

  const faqSchema = useMemo(() => buildFaqSchema(faq), [faq]);
  const title = t("faq.title");

  return (
    <PageLayout
      id="faq"
      path={route.faq || (i18n.language === "en" ? "/en/faq" : "/faq")}
      hasHeader={{ isBlur: true }}
      hasNavBar
      index={true}
    >
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <section className={styles.header} style={{ direction: dir }}>
        <h3 className={styles.faq_title}>{title}</h3>
      </section>

      {/* Final fix: using .faq_article for horizontal spacing */}
      <div className={styles.faq_article} style={{ direction: dir }}>
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

export default FAQ;
