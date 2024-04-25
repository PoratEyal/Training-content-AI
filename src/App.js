import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContentProvider } from '../src/context/ContentContext';
import Details from '../src/pages/details/details';
import Activity from './pages/activity/activity';
import ChoosePath from './pages/choosePath/choosePath';
import PrivacyPolicy from './pages/privacyPolicy/privacyPolicy';
import Maintenance from './pages/maintenance/maintenance';

function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Details />} />
          <Route path="/choosePath" element={<ChoosePath />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} /> */}
          <Route path="/" element={<Maintenance />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
}

export default App;
