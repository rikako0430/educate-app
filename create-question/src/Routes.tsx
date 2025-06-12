// src/Routes.jsx
import { Routes, Route } from "react-router-dom";
import App from "./App.tsx"; // pageA.jsxの読み込み
import PageHowToUse from "./pages/PageHowToUse"; // 使い方の読み込み
import PageAccount from "./pages/PageAccount"; // アカウントの読み込み
import PageProblem from "./pages/PageProblem"; // 問題の読み込み
export const AppRoutes = () => {
   return (
       <Routes>
            {/* Routes.jsxにpageA.jsxとpageHowToUse.jsxのルーティング */}
           <Route path="/" element={<App />} />
           <Route path="/pages/PageHowToUse" element={<PageHowToUse />} />
           <Route path="/pages/PageAccount" element={<PageAccount />} />
           <Route path="/problem/:id" element={<PageProblem />} /> {/* 個別の問題 */}
       </Routes>
   )
}
