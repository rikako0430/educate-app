// import { useState,useEffect } from 'react';

import './App.css';
import Header from "./components/Header";
import { useNavigate  } from 'react-router-dom';
function App() {
  // const [count, setCount] = useState(0)
  const navigate = useNavigate()
  // 問題ページに遷移する関数（id を引数として受け取る）
  const changePageProblem = (id: number) => {
    navigate(`/problem/${id}`);
  };


  return (
    <>
      <Header urlPageHowToUse="./pages/PageHowToUse" urlPageAccount="./pages/PageAccount" />
      <div>
        <button onClick={() => changePageProblem(1)} className='min-h-15 w-9/12 border-4'>問題１</button>
        <button onClick={() => changePageProblem(2)} className='min-h-15 w-9/12 border-4 mt-2'>問題２</button>
        <button onClick={() => changePageProblem(3)} className='min-h-15 w-9/12 border-4 mt-2'>問題３</button>
      </div>
    </>
  )
}

export default App
