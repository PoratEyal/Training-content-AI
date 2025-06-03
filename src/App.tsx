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

import GroupDetails from "./pages/GroupDetails/GroupDetails"
import AI_ActivityParams from "./pages/AI-ActivityParams/AI-ActivityParams"
import AI_ActivityContent from "./pages/AI-ActivityContent/AI-ActivityContent"

import AW_ActivitiesL1 from "./pages/AW-Level1-Categories/awCategories";
import AW_ActivitiesL2 from "./pages/AW-Activities/awActivities";
import AW_Populars from "./pages/AW-Level2-Populars/awPopularActivities";
import AW_ActivityContent from "./pages/AW-Level3-Activity/awActivityContent";

import My_Activities from "./pages/MyActivitiesList/MyActivitiesList"
import My_ActivitiyContent from "./pages/MyActivityContent/MyActivityContent"

import AdminPage from "./pages/AdminPage/AdminPage"
import PrivacyPolicy from "./pages/PagePrivacyPolicy/PrivacyPolicy"
import ContactUs from "./pages/PageContactUs/ContactUs"
import FQA from "./pages/PageFAQ/FAQ"

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

          <Route path={route.AI_activityParamsHe} element={<AI_ActivityParams />} />
          <Route path={route.AI_activityParamsEn} element={<AI_ActivityParams />} />
          <Route path={route.AI_activityParamsEs} element={<AI_ActivityParams />} />
          <Route path={route.AI_activityParamsAr} element={<AI_ActivityParams />} />

          <Route path={route.AI_activityContentHe} element={<AI_ActivityContent />} />
          <Route path={route.AI_activityContentEn} element={<AI_ActivityContent />} />
          <Route path={route.AI_activityContentEs} element={<AI_ActivityContent />} />
          <Route path={route.AI_activityContentAr} element={<AI_ActivityContent />} />


          <Route path={route.AW_ActivitiesL1He} element={<AW_ActivitiesL1 />} />
          <Route path={route.AW_ActivitiesL1En} element={<AW_ActivitiesL1 />} />
          <Route path={route.AW_ActivitiesL1Es} element={<AW_ActivitiesL1 />} />
          <Route path={route.AW_ActivitiesL1Ar} element={<AW_ActivitiesL1 />} />

          <Route path={route.AW_ActivitiesL2He} element={<AW_ActivitiesL2 />} />
          <Route path={route.AW_ActivitiesL2En} element={<AW_ActivitiesL2 />} />
          <Route path={route.AW_ActivitiesL2Es} element={<AW_ActivitiesL2 />} />
          <Route path={route.AW_ActivitiesL2Ar} element={<AW_ActivitiesL2 />} />

          <Route path={route.AW_ActivitiesPopularsHe} element={<AW_Populars />} />
          <Route path={route.AW_ActivitiesPopularsEn} element={<AW_Populars />} />
          <Route path={route.AW_ActivitiesPopularsEs} element={<AW_Populars />} />
          <Route path={route.AW_ActivitiesPopularsAr} element={<AW_Populars />} />

          <Route path={route.AW_ActivityContentHe} element={<AW_ActivityContent />} />
          <Route path={route.AW_ActivityContentEn} element={<AW_ActivityContent />} />
          <Route path={route.AW_ActivityContentEs} element={<AW_ActivityContent />} />
          <Route path={route.AW_ActivityContentAr} element={<AW_ActivityContent />} />

          <Route path={route.MY_ActivitiesL1He} element={<My_Activities />} />
          <Route path={route.MY_ActivitiesL1En} element={<My_Activities />} />
          <Route path={route.MY_ActivitiesL1Es} element={<My_Activities />} />
          <Route path={route.MY_ActivitiesL1Ar} element={<My_Activities />} />

          <Route path={route.MY_ActivityContentHe} element={<My_ActivitiyContent />} />
          <Route path={route.MY_ActivityContentEn} element={<My_ActivitiyContent />} />
          <Route path={route.MY_ActivityContentEs} element={<My_ActivitiyContent />} />
          <Route path={route.MY_ActivityContentAr} element={<My_ActivitiyContent />} />


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
