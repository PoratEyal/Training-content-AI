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

import HomePage from "./pages/HomePage/HomePage"
import GroupDetails from "./pages/Details/Details"
import BuildActivityParams from "./pages/BuildActivity/BuildActivity"
import ActivityAI from "./pages/Activity/Activity"

import Content from "./pages/Content/Content"
import ContentActivities from "./pages/ContentActivities/ContentActivities"
import ContentPopular from "./pages/PopularActivities/PopularActivities"
import ContentActivity from "./pages/ContentActivity/ContentActivity"

import MyActivities from "./pages/MyActivities/MyActivities"
import MyActivityContent from "./pages/MyActivityContent/MyActivityContent"

import AdminPage from "./pages/AdminPage/AdminPage"
import PrivacyPolicy from "./pages/PagePrivacyPolicy/PrivacyPolicy"
import ContactUs from "./pages/ContactUs/ContactUs"
import FAQ from "./pages/FAQ/FAQ"

function App() {
  return (
    <Providers>
      <ReactNotifications className="react-notifications" />
      <Router>
        <LanguageRedirect />
        <Routes>

          {/* Routes that require TSCs/WhatsNew */}
          <Route element={<PrivateRoutes />}>
            <Route path={route.homePageHe} element={<HomePage />} />
            <Route path={route.homePageEn} element={<HomePage />} />
            <Route path={route.homePageEs} element={<HomePage />} />
            <Route path={route.homePageAr} element={<HomePage />} />

            <Route path={route.GroupDetailsHe} element={<GroupDetails />} />
            <Route path={route.GroupDetailsEn} element={<GroupDetails />} />
            <Route path={route.GroupDetailsEs} element={<GroupDetails />} />
            <Route path={route.GroupDetailsAr} element={<GroupDetails />} />

            <Route path={route.activityParamsHe} element={<BuildActivityParams />} />
            <Route path={route.activityParamsEn} element={<BuildActivityParams />} />
            <Route path={route.activityParamsEs} element={<BuildActivityParams />} />
            <Route path={route.activityParamsAr} element={<BuildActivityParams />} />

            <Route path={route.activityAIHe} element={<ActivityAI />} />
            <Route path={route.activityAIEn} element={<ActivityAI />} />
            <Route path={route.activityAIEs} element={<ActivityAI />} />
            <Route path={route.activityAIAr} element={<ActivityAI />} />

            <Route path={route.ContentHe} element={<Content />} />
            <Route path={route.ContentEn} element={<Content />} />
            <Route path={route.ContentEs} element={<Content />} />
            <Route path={route.ContentAr} element={<Content />} />

            <Route path={route.ActivitiesHe} element={<ContentActivities />} />
            <Route path={route.ActivitiesEn} element={<ContentActivities />} />
            <Route path={route.ActivitiesEs} element={<ContentActivities />} />
            <Route path={route.ActivitiesAr} element={<ContentActivities />} />

            <Route path={route.ActivitiesPopularHe} element={<ContentPopular />} />
            <Route path={route.ActivitiesPopularEn} element={<ContentPopular />} />
            <Route path={route.ActivitiesPopularEs} element={<ContentPopular />} />
            <Route path={route.ActivitiesPopularAr} element={<ContentPopular />} />

            <Route path={route.ActivityContentHe} element={<ContentActivity />} />
            <Route path={route.ActivityContentEn} element={<ContentActivity />} />
            <Route path={route.ActivityContentEs} element={<ContentActivity />} />
            <Route path={route.ActivityContentAr} element={<ContentActivity />} />

            <Route path={route.MY_ActivitiesHe} element={<MyActivities />} />
            <Route path={route.MY_ActivitiesEn} element={<MyActivities />} />
            <Route path={route.MY_ActivitiesEs} element={<MyActivities />} />
            <Route path={route.MY_ActivitiesAr} element={<MyActivities />} />

            <Route path={route.MY_ActivityContentHe} element={<MyActivityContent />} />
            <Route path={route.MY_ActivityContentEn} element={<MyActivityContent />} />
            <Route path={route.MY_ActivityContentEs} element={<MyActivityContent />} />
            <Route path={route.MY_ActivityContentAr} element={<MyActivityContent />} />
          </Route>

          {/* Public routes */}
          <Route path={route.contactUsHe} element={<ContactUs />} />
          <Route path={route.contactUsEn} element={<ContactUs />} />
          <Route path={route.contactUsEs} element={<ContactUs />} />
          <Route path={route.contactUsAr} element={<ContactUs />} />

          <Route path={route.faqHe} element={<FAQ />} />
          <Route path={route.faqEn} element={<FAQ />} />
          <Route path={route.faqEs} element={<FAQ />} />
          <Route path={route.faqAr} element={<FAQ />} />

          <Route path={route.privacyPolicyHe} element={<PrivacyPolicy />} />
          <Route path={route.privacyPolicyEn} element={<PrivacyPolicy />} />
          <Route path={route.privacyPolicyEs} element={<PrivacyPolicy />} />
          <Route path={route.privacyPolicyAr} element={<PrivacyPolicy />} />

          <Route path={route.adminHe} element={<AdminPage />} />

          {/* Default redirects */}
          <Route path="/" element={<Navigate replace to={route.homePageHe} />} />
          <Route path={route.all} element={<Navigate replace to={route.homePageHe} />} />
        </Routes>
      </Router>
    </Providers>
  )
}

export default App
