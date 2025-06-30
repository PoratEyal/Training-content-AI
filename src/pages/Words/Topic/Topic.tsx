import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import route from "../../../router/route.json";
import styles from "./Topic.module.css";
import MainBtn from "../../../components/MainBtn/MainBtn";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz";
import SelectDetails from "../../../components/SelectDetails/SelectDetails"
import { ProductType } from "../../../context/ProductType";
import { createWordsQuiz } from "../../../hooks/useWordsQuestions"
import { WORDS_AD_SLOT } from "../../../models/constants/adsSlot";
import { ProductPages } from "../../../models/enum/pages";
import { enforcePageAccess } from "../../../utils/navigation";
import { translateWord } from "../../../utils/translateWord";
import { useContentContext } from "../../../context/ContentContext";

function Topic() {

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = useContentContext();

  const supportedLangs = [
    { label: t("words.predefined.en-Practice"), value: "en" },
    { label: t("words.predefined.es-Practice"), value: "es" },
    { label: t("words.predefined.fr-Practice"), value: "fr" },
    { label: t("words.predefined.it-Practice"), value: "it" },
    { label: t("words.predefined.de-Practice"), value: "de" },
    { label: t("words.predefined.zh-Practice"), value: "zh" },
    { label: t("words.predefined.ro-Practice"), value: "ro" },
    { label: t("words.predefined.el-Practice"), value: "el" },
    { label: t("words.predefined.cy-Practice"), value: "cy" },
    { label: t("words.predefined.tr-Practice"), value: "tr" },
    { label: t("words.predefined.th-Practice"), value: "th" },
    { label: t("words.predefined.nl-Practice"), value: "nl" },
    { label: t("words.predefined.hu-Practice"), value: "hu" },
    { label: t("words.predefined.cs-Practice"), value: "cs" },
    { label: t("words.predefined.ka-Practice"), value: "ka" },
    { label: t("words.predefined.he-Practice"), value: "he" },
    { label: t("words.predefined.ar-Practice"), value: "ar" },
  ].filter(item => item.value !== lang);

  const [languageToLearn, setLanguageToLearn] = useState(() => {
    const saved = localStorage.getItem("WordsLangToLearn") || "";
    const validValues = supportedLangs.map(l => l.value);
    return validValues.includes(saved) ? saved : "";
  });
  const [topicText, setTopicText] = useState(() =>
    localStorage.getItem("WordsTopicText") || ""
  );
  const [mode, setMode] = useState<"ai" | "manual">(() => {
    const saved = localStorage.getItem("WordsMode");
    return saved === "manual" ? "manual" : "ai";
  });

  const [loading, setLoading] = useState(false);

  const wordsHomePagePath = route[`wordsHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsHomePageEn;
  const wordsVocabPath = route[`wordsVocab${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsVocabEn;
  const wordsQuizPath = route[`wordsQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsQuizEn;

  const goBack = () => {
    navigate(wordsHomePagePath);
  };

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_WordsTopic, navigate, wordsHomePagePath);
  }, []);

  useEffect(() => { // Save to LocalStorage
    localStorage.setItem("WordsLangToLearn", languageToLearn);
  }, [languageToLearn]);

  useEffect(() => { // Save to LocalStorage
    localStorage.setItem("WordsTopicText", topicText);
  }, [topicText]);

  useEffect(() => { // Save to LocalStorage
    localStorage.setItem("WordsMode", mode);
  }, [mode]);


  // Adds the correct translation to each word object using the Microsoft Translator API
  async function addTranslationsToWords(generatedWordsJson: string, sourceLang: string, targetLang: string): Promise<
    {
      text: string;
      pronunciation: string;
      dist1: string;
      dist2: string;
      dist3: string;
      correct: string | null;
    }[]
  > {
    try {
      const baseWords = JSON.parse(generatedWordsJson || "[]");

      const translated = await Promise.all(
        baseWords.map(async (item: any) => {
          const translatedText = await translateWord(item.text, sourceLang, targetLang);
          return {
            ...item,
            correct: translatedText // replaces `translate`
          };
        })
      );

      return translated;
    } catch (err) {
      console.error("❌ Failed to process generated words:", err);
      return [];
    }
  }


  // Cleans up code block formatting from Gemini JSON response before parsing
  function cleanJSONResponse(text: string): string {
    return text
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();
  }

  // Replace any distractor that matches the correct translation with a combined distractor from the other two
  function removeHebrewNiqqud(str: string): string {
    return str.normalize("NFD").replace(/[\u0591-\u05C7]/g, "");
  }

  function fixDistractors(
    words: {
      text: string;
      pronunciation: string;
      dist1: string;
      dist2: string;
      dist3: string;
      correct: string | null;
    }[],
    lang: string
  ): typeof words {
    const shouldCleanNiqqud = lang === "he";

    return words.map(word => {
      let { dist1, dist2, dist3, correct } = word;
      if (!correct) return word;

      const normalize = (text: string) => shouldCleanNiqqud ? removeHebrewNiqqud(text) : text;

      const cleanCorrect = normalize(correct);
      const cleanDist1 = normalize(dist1);
      const cleanDist2 = normalize(dist2);
      const cleanDist3 = normalize(dist3);

      const distractors = [
        { raw: dist1, clean: cleanDist1 },
        { raw: dist2, clean: cleanDist2 },
        { raw: dist3, clean: cleanDist3 },
      ];

      const valid = distractors.filter(d => d.clean !== cleanCorrect).map(d => d.raw);

      const [newDist1 = "", newDist2 = "", newDist3 = ""] = valid;

      return {
        ...word,
        correct: cleanCorrect,
        dist1: normalize(newDist1),
        dist2: normalize(newDist2),
        dist3: normalize(newDist3),
      };
    });
  }



  // Go Go Go
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!languageToLearn || !mode) return;

    setLoading(true);

    try {

      if (topicText === "מעצר") { // Specific case
        const res = await fetch("/Words/army.json");
        const json = await res.json();
        sessionStorage.setItem("GeneratedWordsQuiz", JSON.stringify(json));
        sessionStorage.setItem("wordsQuizLang", "ar")
      }

      else if (mode === "ai") {
        const generateWithAI = await createWordsQuiz(topicText || null, languageToLearn, lang, 10);
        const jsonClean = cleanJSONResponse(generateWithAI);
        const jsonWithTranslation = await addTranslationsToWords(jsonClean, languageToLearn, lang);
        const jsonWithFixedDisctractors = fixDistractors(jsonWithTranslation, lang);
        sessionStorage.setItem("GeneratedWordsQuiz", JSON.stringify(jsonWithFixedDisctractors));
        sessionStorage.setItem("wordsQuizLang", languageToLearn)
      }

      navigate(wordsQuizPath);

    } catch (err) {
      console.error("❌ Error creating quiz:", err);
    } finally {
      setLoading(false);
    }
  };

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
            <label htmlFor="languageInput">{t("words.topic.selectLangLabel")}</label>
            <SelectDetails
              data={supportedLangs}
              placeholder={t("words.topic.selectLang")}
              obj={languageToLearn}
              setObj={setLanguageToLearn}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="topicInput">{t("words.topic.subjectLabel")}</label>
            <input
              id="topicInput"
              type="text"
              placeholder={t("words.topic.subjectExample")}
              value={topicText}
              onChange={(e) => setTopicText(e.target.value)}
            />
          </div>

          <div className={styles.input} style={{ display: "none" }}>
            <label>{t("words.topic.radioLabel")}</label>
            <label>
              <input
                type="radio"
                value="ai"
                checked={mode === "ai"}
                onChange={() => setMode("ai")}
              />
              {t("words.topic.typeAutomatic")}
            </label>
            <label>
              <input
                type="radio"
                value="manual"
                disabled
                checked={mode === "manual"}
                onChange={() => setMode("manual")}
              />
              {t("words.topic.typeManual")}
            </label>
          </div>

          <div className={styles.button_wrapper}>
            <MainBtn
              text={t("common.btnContinue")}
              isDisabled={!languageToLearn || !mode || loading}
              type="submit"
              height={42}
              func={handleSubmit}
            />
          </div>

        </form>
      </PageLayout>

      {loading && <LoadingQuiz />}
    </>
  );
}

export default Topic;
