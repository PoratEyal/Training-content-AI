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

import PrivateRoutes from "./router/PrivateRoutes"

// Youth Activities
import HomePage from "./pages/YouthActivity/HomePage/HomePage"
import GroupDetails from "./pages/YouthActivity/Details/Details"
import BuildActivityParams from "./pages/YouthActivity/BuildActivity/BuildActivity"
import ActivityAI from "./pages/YouthActivity/Activity/Activity"
import Content from "./pages/YouthActivity/Content/Content"
import ContentActivities from "./pages/YouthActivity/ContentActivities/ContentActivities"
import ContentPopular from "./pages/YouthActivity/PopularActivities/PopularActivities"
import ContentActivity from "./pages/YouthActivity/ContentActivity/ContentActivity"
import MyActivities from "./pages/YouthActivity/MyActivities/MyActivities"
import MyActivityContent from "./pages/YouthActivity/MyActivityContent/MyActivityContent"
import ActivityFAQ from "./pages/YouthActivity/FAQ/FAQ"
import AdminPage from "./pages/YouthActivity/AdminPage/AdminPage"

// Smart Practice
import PracticeHomePage from "./pages/SmartPractice/HomePage/Practice"
import PracticeFAQ from "./pages/SmartPractice/FAQ/FAQ"
import PracticeQuiz from "./pages/SmartPractice/Quiz/Quiz"
import PracticeTopic from "./pages/SmartPractice/Topic/Topic"

// Common
import PrivacyPolicy from "./pages/Common/PagePrivacyPolicy/PrivacyPolicy"
import ContactUs from "./pages/Common/ContactUs/ContactUs"

const langs = ["He", "En", "Es", "Ar"]

const privateRoutes = [
  // Youth Activities private pages
  { key: "homePage", element: <HomePage /> },
  { key: "GroupDetails", element: <GroupDetails /> },
  { key: "activityParams", element: <BuildActivityParams /> },
  { key: "activityAI", element: <ActivityAI /> },
  { key: "Content", element: <Content /> },
  { key: "Activities", element: <ContentActivities /> },
  { key: "ActivitiesPopular", element: <ContentPopular /> },
  { key: "ActivityContent", element: <ContentActivity /> },
  { key: "MY_Activities", element: <MyActivities /> },
  { key: "MY_ActivityContent", element: <MyActivityContent /> },

  // Smart Practice private pages
  { key: "practiceHomePage", element: <PracticeHomePage /> },
  { key: "practiceQuiz", element: <PracticeQuiz /> },
  { key: "practiceTopic", element: <PracticeTopic /> },
]

const publicRoutes = [
  { key: "contactUs", element: <ContactUs /> },
  { key: "faq", element: <ActivityFAQ /> },
  { key: "privacyPolicy", element: <PrivacyPolicy /> },
  { key: "smartFAQ", element: <PracticeFAQ /> },
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
              langs.map(lang => (
                <Route key={`${key}${lang}`} path={route[`${key}${lang}`]} element={element} />
              ))
            )}
          </Route>

          {/* Public Routes */}
          {publicRoutes.map(({ key, element }) =>
            langs.map(lang => (
              <Route key={`${key}${lang}`} path={route[`${key}${lang}`]} element={element} />
            ))
          )}

          {/* Admin route – Hebrew only */}
          <Route path={route.adminHe} element={<AdminPage />} />

          {/* Default Redirects */}
          <Route path="/" element={<Navigate replace to={route.homePageHe} />} />
          <Route path="*" element={<Navigate replace to={route.homePageHe} />} />
        </Routes>
      </Router>
    </Providers>
  )
}

export default App
