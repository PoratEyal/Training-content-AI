import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import route from "../../../router/route.json";
import styles from "./Topic.module.css";
import MainBtn from "../../../components/MainBtn/MainBtn";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz";
import { ProductType } from "../../../context/ProductType";
import { WORDS_AD_SLOT } from "../../../models/constants/adsSlot";
import { ProductPages } from "../../../models/enum/pages";
import { enforcePageAccess } from "../../../utils/navigation";
import { useContentContext } from "../../../context/ContentContext";


function Topic() {

  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [topic, setTopic] = useState<{ value: string; label: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentPage, setCurrentPage } = useContentContext();

  const wordsHomePagePath = route[`wordsHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsHomePageEn;
  const wordsVocabPath = route[`wordsVocab${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsVocabEn;
  const goBack = () => { navigate(wordsHomePagePath); };

  const dropDownOptions = [
    { value: "englishPractice", label: "מילים שימושיות באנגלית" },
    { value: "spanishPractice", label: "מילים שימושיות בספרדית" },
    { value: "italiaPractice", label: "מילים שימושיות באיטלקית" },
    { value: "hebrewPractice", label: "מילים שימושיות בעברית" },
    { value: "arabicPractice", label: "מילים שימושיות בערבית" }
  ]

  useEffect(() => { // Prevent direct access via URL
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_WordsTopic, navigate, wordsHomePagePath);
  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault()

    let selectedValue = topic?.value?.trim()

    if (!selectedValue && topic?.label) {
      selectedValue = topic.label.trim()
    }

    // Special condition for "Suspect arrest" - We do not want to expose it in the dropdown
    if (selectedValue === "מעצר") {
      selectedValue = "armyPractice"
    }

    navigate(wordsVocabPath, { state: { topicValue: selectedValue } })
  }




  return (
    <>
      <PageLayout
        id="wordsTopic"
        productType={ProductType.Practice}
        hasGreenBackground
        hasHeader={{ goBack, hasTitle: t("topic.title") }}
        hasAds={WORDS_AD_SLOT}
        hasNavBar
        index={false}
      >
        <form onSubmit={handleSubmit} className={styles.topic_form_container}>

          <div className={styles.input}>
            <CreatableSelect
              isClearable
              onChange={(newValue) => setTopic(newValue)}
              options={dropDownOptions}
              placeholder={t("topic.topicPlaceholder")}
            />
          </div>

          <div className={styles.button_wrapper}>
            <MainBtn
              text={t("common.btnContinue")}
              isDisabled={!topic || loading}
              type="submit"
              height={42}
              func={handleSubmit}
            />
          </div>
        </form>
      </PageLayout>

      {loading && <LoadingQuiz />}
    </>
  )
}

export default Topic
