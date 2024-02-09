import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimeEntries from "../components/TimeEntries";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<TimeEntries />} />
    </Routes>
  </Router>
);