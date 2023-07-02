import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlaceList from "./components/PlaceList";
import PlaceDetail from "./components/PlaceDetail";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaceList />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
