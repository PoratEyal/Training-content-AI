import styles from "./FAQ.module.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import FadeEffect from "../../../components/FadeEffect/FadeEffect";
import { useLanguage } from "../../../i18n/useLanguage";
import { useTranslation } from "react-i18next";
import { buildFaqSchema } from "../../../models/schemaOrg";
import React, { useMemo } from "react";
import { useProduct } from "../../../context/ProductContext"

const FAQ: React.FC = () => {

  const { t } = useTranslation();
  const { dir, lang } = useLanguage();
  const product = useProduct()

  const faq = t("faqPractice.questions", { returnObjects: true }) as {
    q: string;
    a: string;
  }[];

  const faqSchema = useMemo(() => buildFaqSchema(faq), [faq]);
  const title = t("faqPractice.title");

  return (
    <PageLayout
      id="practiceFaq"
      productType={product}
      hasHeader={{ isBlur: true }}
      hasNavBar
      index={true}
    >
      <FadeEffect hasFade>
        <article className={styles.faq_article} dir={dir}>
          <section>
            <h1 className={styles.faq_title}>{title}</h1>

            {faq.map(({ q, a }, idx) => (
              <div key={idx} className={styles.faq_item}>
                <div className={styles.faq_q}>{q}</div>
                <div className={styles.faq_a}>{a}</div>
              </div>
            ))}
            <div style={{ height: "20px" }}></div>
          </section>
        </article>
      </FadeEffect>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </PageLayout>
  );
};

export default FAQ;
