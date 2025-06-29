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
    { value: "en-Practice", label: t("words.predefined.en-Practice") },
    { value: "es-Practice", label: t("words.predefined.es-Practice") },
    { value: "it-Practice", label: t("words.predefined.it-Practice") },
    { value: "fr-Practice", label: t("words.predefined.fr-Practice") },
    { value: "he-Practice", label: t("words.predefined.he-Practice") },
    { value: "ar-Practice", label: t("words.predefined.ar-Practice") }
  ]

  useEffect(() => { // Prevent direct access via URL
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_WordsTopic, navigate, wordsHomePagePath);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("WordsTopic")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed?.value && parsed?.label) {
          setTopic(parsed)
        }
      } catch (e) {
      }
    }
  }, [])


  const handleSubmit = async (e) => {

    e.preventDefault()

    let selectedValue = topic?.value?.trim()

    if (!selectedValue && topic?.label) {
      selectedValue = topic.label.trim()
    }

    // Special conditions for "Suspect arrest" and internal debug - We do not want to expose it in the dropdown
    if (selectedValue === "מעצר")
      selectedValue = "armyPractice"
    else     if (selectedValue === "בדיקות")
      selectedValue = "_debug"

    navigate(wordsVocabPath, { state: { topicValue: selectedValue } })
  }




  return (
    <>
      <PageLayout
        id="wordsTopic"
        productType={ProductType.Words}
        hasGreenBackground
        hasHeader={{ goBack, hasTitle: t("words.topic.pageTitle") }}
        hasAds={WORDS_AD_SLOT}
        hasNavBar
        index={false}
      >
        <form onSubmit={handleSubmit} className={styles.topic_form_container}>

          <div className={styles.input}>
            <CreatableSelect
              value={topic}
              onChange={(newValue) => {
                setTopic(newValue)
                if (newValue?.value) {
                  localStorage.setItem("WordsTopic", JSON.stringify(newValue))
                } else {
                  localStorage.removeItem("WordsTopic")
                }
              }}
              options={dropDownOptions}
              placeholder={t("words.topic.select")}
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
