import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SurveyStart } from "./pages/SurveyStart";
import { SurveySelectOne } from "./pages/SurveySelectOne";
import { SurveySelectVarious } from "./pages/SurveySelectVarious";
import { SurveyFinish } from "./pages/SurveyFinish";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<SurveyStart />} />
          <Route path="/surveyselectone" element={<SurveySelectOne />} />
          <Route
            path="/surveyselectvarious"
            element={<SurveySelectVarious />}
          />
          <Route path="/surveyfinish" element={<SurveyFinish />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
