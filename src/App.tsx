//
// This file sets up all the website's pages
// It switches to the right page when someone clicks a link and handles the languages
//
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { ReactNotifications } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import route from "./router/route.json"
import "./App.css"
import Providers from "./router/Providers"
import LanguageRedirect from "./components/LanguageRedirect"
import FallbackRedirect from "./components/FallbackRedirect"

// Youth Activities
import YouthHomePage from "./pages/YouthActivity/HomePage/Youth"
import YouthDetails from "./pages/YouthActivity/Details/Details"
import YouthBuildActivity from "./pages/YouthActivity/BuildActivity/BuildActivity"
import YouthActivityAI from "./pages/YouthActivity/Activity/Activity"
import YouthContent from "./pages/YouthActivity/Content/Content"
import YouthContentActivities from "./pages/YouthActivity/ContentActivities/ContentActivities"
import YouthContentPopular from "./pages/YouthActivity/PopularActivities/PopularActivities"
import YouthContentActivity from "./pages/YouthActivity/ContentActivity/ContentActivity"
import YouthMyActivities from "./pages/YouthActivity/MyActivities/MyActivities"
import YouthMyActivityContent from "./pages/YouthActivity/MyActivityContent/MyActivityContent"
import YouthFAQ from "./pages/YouthActivity/FAQ/FAQ"
import YouthPrivacyPolicy from "./pages/YouthActivity/PrivacyPolicy/PrivacyPolicy"
import YouthAdminPage from "./pages/YouthActivity/AdminPage/AdminPage"
import YouthContactUsRoute from "./pages/YouthActivity/ContactUs/ContactUs"

// Smart Practice
import PracticeHomePage from "./pages/SmartPractice/HomePage/Practice"
import PracticeTopic from "./pages/SmartPractice/Topic/Topic"
import PracticeQuiz from "./pages/SmartPractice/Quiz/Quiz"
import PracticeFAQ from "./pages/SmartPractice/FAQ/FAQ"
import PracticePrivacyPolicy from "./pages/SmartPractice/PrivacyPolicy/PrivacyPolicy"
import PracticeContactUsRoute from "./pages/SmartPractice/ContactUs/ContactUs"

// Learn Words Language
import WordsHomePage from "./pages/Words/HomePage/Home"
import WordsVocab from "./pages/Words/Vocab/Vocab"
import WordsQuiz from "./pages/Words/Quiz/Quiz"
//import WordsFAQ from "./pages/Language/FAQ/FAQ"
//import WordsPrivacyPolicy from "./pages/Language/PrivacyPolicy/PrivacyPolicy"
//import WordsContactUsRoute from "./pages/Language/ContactUs/ContactUs"

import { supportedLangs as langs } from "./i18n/languages"

const allRoutes = [
  // Youth
  { key: "youthHomePage", element: <YouthHomePage /> },
  { key: "youthDetails", element: <YouthDetails /> },
  { key: "youthBuild", element: <YouthBuildActivity /> },
  { key: "youthActivityAI", element: <YouthActivityAI /> },
  { key: "youthContent", element: <YouthContent /> },
  { key: "youthActivities", element: <YouthContentActivities /> },
  { key: "youthActivitiesPopular", element: <YouthContentPopular /> },
  { key: "youthActivityContent", element: <YouthContentActivity /> },
  { key: "youthMyActivities", element: <YouthMyActivities /> },
  { key: "youthMyActivityContent", element: <YouthMyActivityContent /> },
  { key: "youthContactUs", element: <YouthContactUsRoute /> },
  { key: "youthPrivacyPolicy", element: <YouthPrivacyPolicy /> },
  { key: "youthFAQ", element: <YouthFAQ /> },

  // Practice
  { key: "practiceHomePage", element: <PracticeHomePage /> },
  { key: "practiceTopic", element: <PracticeTopic /> },
  { key: "practiceQuiz", element: <PracticeQuiz /> },
  { key: "practiceContactUs", element: <PracticeContactUsRoute /> },
  { key: "practicePrivacyPolicy", element: <PracticePrivacyPolicy /> },
  { key: "practiceFAQ", element: <PracticeFAQ /> },

  // Words
  { key: "wordsHomePage", element: <WordsHomePage /> },
  { key: "wordsVocab", element: <WordsVocab /> },
  { key: "wordsQuiz", element: <WordsQuiz /> },

]

function App() {
  return (
    <Providers>
      <ReactNotifications className="react-notifications" />
      <Router>
        <LanguageRedirect />
        <Routes>
          {allRoutes.map(({ key, element }) =>
            langs.map(lang => {                                               // example: lang = "he"
              const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)    // example: langKey = "He"
              const basePath = route[`${key}${langKey}`]                      // example: route["youthHomePageHe"]

              // Special case for youthHomePage: support both /he and /he/youth
              if (key === "youthHomePage") {
                return [
                  <Route key={`${key}${lang}-base`} path={`/${lang}`} element={element} />,
                  <Route key={`${key}${lang}-alt`} path={`/${lang}/youth`} element={element} />
                ]
              }

              return <Route key={`${key}${lang}`} path={basePath} element={element} />
            })
          )}

          {/* Admin route – Heb only */}
          <Route path={route.adminHe} element={<YouthAdminPage />} />

          {/* Fallback for undefined routes */}
          <Route path="*" element={<FallbackRedirect />} />
        </Routes>
      </Router>
    </Providers>
  )
}

export default App
