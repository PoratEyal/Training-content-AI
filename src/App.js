import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContentProvider } from '../src/context/ContentContext';
import Details from '../src/pages/details/details';
import ChooseSubject from './pages/chooseSubject/chooseSubject';
import Activity from './pages/activity/activity'

function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Details />} />
          <Route path="/chooseSubject" element={<ChooseSubject />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
}

export default App;
