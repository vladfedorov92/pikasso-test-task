import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/mainPage";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { QuoteData } from "./constans/constans";
import { RootState } from "./store/store";
import { addQuote, getQuoteAction } from "./slices/quoteSlice";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path={"/"}
          element={
            <div className={"field"}>
              <MainPage />
            </div>
          }
        ></Route>
        <Route path={"game"} element={<div className={"field"}></div>}></Route>
        <Route
          path={"game/result"}
          element={<div className={"field"}></div>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
