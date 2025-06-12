import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import IfAnswer from '../components/IfAnswer';

type Problem = {
  id: number;
  question: string;
  answer: string[];
  correct: string;
};

const PageProblem: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL から id を取得
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('http://localhost:8080');
        const selectedProblem = data.find((p: Problem) => p.id === Number(id));
        setProblem(selectedProblem || null);
      } catch (error) {
        console.error('データ取得エラー:', error);
        setProblem(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header urlPageHowToUse='../pages/PageHowToUse' urlPageAccount='../pages/PageAccount' />
        <div className='w-9/12 min-h-100 m-auto'>
          <p>ローディング中...</p>
        </div>
      </>
    );
  }

  if (!problem) {
    return (
      <>
        <Header urlPageHowToUse='../pages/PageHowToUse' urlPageAccount='../pages/PageAccount' />
        <div className='w-9/12 min-h-100 m-auto'>
          <p>問題が見つかりませんでした。</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header urlPageHowToUse='../pages/PageHowToUse' urlPageAccount='../pages/PageAccount' />
      <div className='w-9/12 min-h-100 m-auto'>
        <div className='mx-auto min-h-60 my-2 border-6'>
          <p>
            <span>{problem.question}</span>
          </p>
        </div>
        <div className='mx-auto min-h-60 my-4 border-6'>
          <IfAnswer answer={problem.answer} correctAnswer={problem.correct} />
        </div>
      </div>
    </>
  );
};

export default PageProblem;