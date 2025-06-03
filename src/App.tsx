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

import HomePage from "./pages/HomePage/HomePage"

import GroupDetails from "./pages/Details/Details"
import BuildActivityParams from "./pages/BuildActivity/BuildActivity"
import ActivityAI from "./pages/Activity/Activity"

import contentTopics from "./pages/Content/Content";
import contentActivities from "./pages/ContentActivities/ContentActivities";
import contentPopular from "./pages/PopularActivities/PopularActivities";
import contentActivity from "./pages/ContentActivity/ContentActivity";

import myActivities from "./pages/MyActivities/MyActivities"
import myActivitiyContent from "./pages/MyActivityContent/MyActivityContent"

import AdminPage from "./pages/AdminPage/AdminPage"
import PrivacyPolicy from "./pages/PagePrivacyPolicy/PrivacyPolicy"
import ContactUs from "./pages/ContactUs/ContactUs"
import FQA from "./pages/FAQ/FAQ"

function App() {
  return (
    <Providers>
      <ReactNotifications className="react-notifications" />
      <Router>
        {/* LanguageRedirect to keep the URL in sync with the language */}
        <LanguageRedirect />
        <Routes>
          <Route path={route.homePageHe} element={<HomePage />} />
          <Route path={route.homePageEn} element={<HomePage />} />
          <Route path={route.homePageEs} element={<HomePage />} />
          <Route path={route.homePageAr} element={<HomePage />} />

          <Route path={route.GroupDetailsHe} element={<GroupDetails />} />
          <Route path={route.GroupDetailsEn} element={<GroupDetails />} />
          <Route path={route.GroupDetailsEs} element={<GroupDetails />} />
          <Route path={route.GroupDetailsAr} element={<GroupDetails />} />

          <Route path={route.AI_activityParamsHe} element={<BuildActivityParams />} />
          <Route path={route.AI_activityParamsEn} element={<BuildActivityParams />} />
          <Route path={route.AI_activityParamsEs} element={<BuildActivityParams />} />
          <Route path={route.AI_activityParamsAr} element={<BuildActivityParams />} />

          <Route path={route.AI_activityContentHe} element={<ActivityAI />} />
          <Route path={route.AI_activityContentEn} element={<ActivityAI />} />
          <Route path={route.AI_activityContentEs} element={<ActivityAI />} />
          <Route path={route.AI_activityContentAr} element={<ActivityAI />} />


          <Route path={route.AW_TopicsHe} element={<contentTopics />} />
          <Route path={route.AW_TopicsEn} element={<contentTopics />} />
          <Route path={route.AW_TopicsEs} element={<contentTopics />} />
          <Route path={route.AW_TopicsAr} element={<contentTopics />} />

          <Route path={route.AW_ActivitiesHe} element={<contentActivities />} />
          <Route path={route.AW_ActivitiesEn} element={<contentActivities />} />
          <Route path={route.AW_ActivitiesEs} element={<contentActivities />} />
          <Route path={route.AW_ActivitiesAr} element={<contentActivities />} />

          <Route path={route.AW_ActivitiesPopularHe} element={<contentPopular />} />
          <Route path={route.AW_ActivitiesPopularEn} element={<contentPopular />} />
          <Route path={route.AW_ActivitiesPopularEs} element={<contentPopular />} />
          <Route path={route.AW_ActivitiesPopularAr} element={<contentPopular />} />

          <Route path={route.AW_ActivityContentHe} element={<contentActivity />} />
          <Route path={route.AW_ActivityContentEn} element={<contentActivity />} />
          <Route path={route.AW_ActivityContentEs} element={<contentActivity />} />
          <Route path={route.AW_ActivityContentAr} element={<contentActivity />} />

          <Route path={route.MY_ActivitiesHe} element={<myActivities />} />
          <Route path={route.MY_ActivitiesEn} element={<myActivities />} />
          <Route path={route.MY_ActivitiesEs} element={<myActivities />} />
          <Route path={route.MY_ActivitiesAr} element={<myActivities />} />

          <Route path={route.MY_ActivityContentHe} element={<myActivitiyContent />} />
          <Route path={route.MY_ActivityContentEn} element={<myActivitiyContent />} />
          <Route path={route.MY_ActivityContentEs} element={<myActivitiyContent />} />
          <Route path={route.MY_ActivityContentAr} element={<myActivitiyContent />} />


          <Route path={route.contactUsHe} element={<ContactUs />} />
          <Route path={route.contactUsEn} element={<ContactUs />} />
          <Route path={route.contactUsEs} element={<ContactUs />} />
          <Route path={route.contactUsAr} element={<ContactUs />} />

          <Route path={route.faqHe} element={<FQA />} />
          <Route path={route.faqEn} element={<FQA />} />
          <Route path={route.faqEs} element={<FQA />} />
          <Route path={route.faqAr} element={<FQA />} />

          <Route path={route.privacyPolicyHe} element={<PrivacyPolicy />} />
          <Route path={route.privacyPolicyEn} element={<PrivacyPolicy />} />
          <Route path={route.privacyPolicyEs} element={<PrivacyPolicy />} />
          <Route path={route.privacyPolicyAr} element={<PrivacyPolicy />} />

          {/* Admin page */}
          <Route path={route.adminHe} element={<AdminPage />} />

          {/* Redirects */}
          <Route path="/" element={<Navigate replace to={route.homePageHe} />} />
          <Route path={route.all} element={<Navigate replace to={route.homePageHe} />} />
        </Routes>
      </Router>
    </Providers>
  )
}

export default App
