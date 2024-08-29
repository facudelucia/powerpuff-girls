import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowPage from './pages/ShowPage';
import EpisodePage from './pages/EpisodePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowPage />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
      </Routes>
    </Router>
  );
};

export default App;
