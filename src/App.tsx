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

import PrivateRoutes from "./router/PrivateRoutes"

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
import YouthPrivacyPolicy from "./pages/YouthActivity/PrivacyPolicy/PrivacyPolicy";
import YouthAdminPage from "./pages/YouthActivity/AdminPage/AdminPage"
import YouthContactUsRoute from "./pages/YouthActivity/ContactUs/ContactUs";

// Smart Practice
import PracticeHomePage from "./pages/SmartPractice/HomePage/Practice"
import PracticeQuiz from "./pages/SmartPractice/Quiz/Quiz"
import PracticeTopic from "./pages/SmartPractice/Topic/Topic"
import PracticeFAQ from "./pages/SmartPractice/FAQ/FAQ"
import PracticePrivacyPolicy from "./pages/SmartPractice/PrivacyPolicy/PrivacyPolicy";
import PracticeContactUsRoute from "./pages/SmartPractice/ContactUs/ContactUs";


import { supportedLangs as langs } from "./i18n/languages"

const privateRoutes = [
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

  { key: "practiceHomePage", element: <PracticeHomePage /> },
  { key: "practiceQuiz", element: <PracticeQuiz /> },
  { key: "practiceTopic", element: <PracticeTopic /> },
]

const publicRoutes = [
  { key: "youthContactUs", element: <YouthContactUsRoute /> },
  { key: "youthPrivacyPolicy", element: <YouthPrivacyPolicy /> },
  { key: "youthFAQ", element: <YouthFAQ /> },

  { key: "practiceContactUs", element: <PracticeContactUsRoute /> },
  { key: "practicePrivacyPolicy", element: <PracticePrivacyPolicy /> },
  { key: "practiceFAQ", element: <PracticeFAQ /> },
]

function App() {
  return (
    <Providers>
      <ReactNotifications className="react-notifications" />
      <Router>
        <LanguageRedirect />
        <Routes>

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            {privateRoutes.map(({ key, element }) =>
              langs.flatMap(lang => {
                const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)
                const basePath = route[`${key}${langKey}`]

                if (key === "youthHomePage") {
                  return [
                    <Route key={`${key}${lang}-base`} path={basePath} element={element} />,
                    <Route key={`${key}${lang}-alt`} path={`/${lang}/youth`} element={element} />,
                  ]
                }

                return [
                  <Route key={`${key}${lang}`} path={basePath} element={element} />
                ]
              })
            )}

          </Route>

          {/* Public Routes */}
          {publicRoutes.map(({ key, element }) =>
            langs.map(lang => {
              const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)
              return (
                <Route
                  key={`${key}${lang}`}
                  path={route[`${key}${langKey}`]}
                  element={element}
                />
              )
            })
          )}

          {/* Admin route – Hebrew only */}
          <Route path={route.adminHe} element={<YouthAdminPage />} />

          {/* Default Redirects */}
          <Route path="/" element={<Navigate replace to={route.youthHomePageEn} />} />
          <Route path="*" element={<FallbackRedirect />} />
        </Routes>
      </Router>
    </Providers>
  )
}

export default App
