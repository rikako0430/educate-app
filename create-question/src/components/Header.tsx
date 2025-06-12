
import React from "react";
// react-router-domのインポートを追加
import { useNavigate  } from 'react-router-dom';


// Props の型を定義（オプション）
interface HeaderProps {
  urlPageHowToUse: string;
  urlPageAccount: string;
}

const Header: React.FC<HeaderProps> = ({ 
    urlPageHowToUse, 
    urlPageAccount 
}) => {
    const navigate = useNavigate();

    const changePageHome = () => {
        navigate('/');
    };
    const changePageHowToUse = () => {
        navigate(urlPageHowToUse); // 変数を直接渡す
    };
    const changePageAccount = () => {
        navigate(urlPageAccount); // 変数を直接渡す
    };
    return(
        <>
        <h2 className='mx-auto my-7 text-4xl'>タイトル</h2>
        <div className='w-9/12 my-2 mx-auto flex text-xl justify-evenly bg-blue-900 py-3'>
            <button className='text-white' onClick={changePageHome}>問題一覧</button>
            <button className='text-white' onClick={changePageHowToUse}>使い方</button>
            <button className='text-white' onClick={changePageAccount}>アカウント</button>
        </div>
        </>
    )
}
export default Header;