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
import PrivacyPolicy from "./pages/Common/Privacy/Privacy"

// Youth Activities
import YouthHomePage from "./pages/YouthActivity/HomePage/Home"
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
import YouthAddActivity from "./pages/YouthActivity/AdminPage/addActivity"

// Event Activities
import EventHomePage from "./pages/Event/HomePage/Home"
import EventDetails from "./pages/Event/Details/Details"
import EventBuildActivity from "./pages/Event/BuildActivity/BuildActivity"
import EventActivityAI from "./pages/Event/Activity/Activity"
import EventFAQ from "./pages/Event/FAQ/FAQ"


// Smart Practice
import PracticeHomePage from "./pages/Practice/HomePage/Home"
import PracticeTopic from "./pages/Practice/Topic/Topic"
import PracticeQuiz from "./pages/Practice/Quiz/Quiz"
import PracticeFAQ from "./pages/Practice/FAQ/FAQ"

// Learn Words Language
import WordsHomePage from "./pages/Words/HomePage/Home"
import WordsTopic from "./pages/Words/Topic/Topic"
import WordsQuiz from "./pages/Words/Quiz/Quiz"
import WordsFAQ from "./pages/Words/FAQ/FAQ"

import { supportedLangs as langs } from "./i18n/languages"

const allRoutes = [
  // Common
  { key: "privacyPolicy", element: <PrivacyPolicy /> },

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
  { key: "youthFAQ", element: <YouthFAQ /> },
  { key: "youthAddActivity", element: <YouthAddActivity /> },

  // Event
  { key: "eventHomePage", element: <EventHomePage /> },
  { key: "eventDetails", element: <EventDetails /> },
  { key: "eventBuild", element: <EventBuildActivity /> },
  { key: "eventActivityAI", element: <EventActivityAI /> },
  { key: "eventFAQ", element: <EventFAQ /> },


  // Practice
  { key: "practiceHomePage", element: <PracticeHomePage /> },
  { key: "practiceTopic", element: <PracticeTopic /> },
  { key: "practiceQuiz", element: <PracticeQuiz /> },
  { key: "practiceFAQ", element: <PracticeFAQ /> },

  // Words
  { key: "wordsHomePage", element: <WordsHomePage /> },
  { key: "wordsTopic", element: <WordsTopic /> },
  { key: "wordsQuiz", element: <WordsQuiz /> },
  { key: "wordsFAQ", element: <WordsFAQ /> },

]

function App() {
  return (
    <Providers>
      <ReactNotifications className="react-notifications" />
      <Router>
        <LanguageRedirect />
        <Routes>
          {/* Redirect /he, /en, /es, /ar to their respective /youth pages */}
          {langs.map(lang => (
            <Route key={`redirect-${lang}`} path={`/${lang}`} element={<Navigate to={`/${lang}/youth`} replace />} />
          ))}

          {allRoutes.map(({ key, element }) =>
            langs.map(lang => {                                               // example: lang = "he"
              const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)    // example: langKey = "He"
              const basePath = route[`${key}${langKey}`]                      // example: route["youthHomePageHe"]
              return <Route key={`${key}${lang}`} path={basePath} element={element} />
            })
          )}

          {/* Fallback for undefined routes */}
          <Route path="*" element={<FallbackRedirect />} />
        </Routes>
      </Router>
    </Providers>
  )
}

export default App
