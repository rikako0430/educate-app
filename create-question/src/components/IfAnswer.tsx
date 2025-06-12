

import React, { useState } from 'react';
// react-router-domのインポートを追加


// Props の型を定義（オプション）
interface AnswerProps {
  answer: string[];
  correctAnswer: string;
}

const IfAnswer: React.FC<AnswerProps> = ({
  answer,
  correctAnswer
}) => {
   // ユーザーの選択結果を管理
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // 正解/不正解の状態を管理
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // ボタンクリック時の処理
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);
  };
   return (
    <>
      <ul className="flex flex-wrap list-none p-4">
        {answer.map((option) => (
          <li key={option} className="w-3/6 box-border py-5">
            <button
              className={`w-50 p-4 text-2xl rounded ${
                selectedAnswer === option
                  ? isCorrect && option === correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
                    // if (selectedAnswer === option) {
                    // if (isCorrect && option === correctAnswer) {
                    //     className += ' bg-green-500 text-white';
                    // } else {
                    //     className += ' bg-red-500 text-white';
                    // }
                    // } else {
                    // className += ' bg-blue-500 text-white hover:bg-blue-600';
                    // }
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null} // 選択後は無効化
            >
            {option}
            </button>
          </li>
        ))}
      </ul>
      {/* 結果表示 */}
      {selectedAnswer && (
        <div className="my-1 p-4 text-center text-xl">
          {isCorrect ? ( 
            <p className="text-green-600">正解です！</p>
          ) : (
            <p className="text-red-600">不正解!! 正解は {correctAnswer} </p>
          )}
        </div>
      )}
    </>
  );
};

export default IfAnswer;

