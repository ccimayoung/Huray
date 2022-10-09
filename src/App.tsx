import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SurveyStart } from "./pages/SurveyStart";
import { RecoilRoot } from "recoil";
import { SurveyProgress } from "./pages/SurveyProgress";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<SurveyStart />} />
          <Route path="/surveyprogress" element={<SurveyProgress />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
