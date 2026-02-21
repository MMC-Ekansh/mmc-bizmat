import { useState } from 'react';

// Components
import HomeScreen from './components/HomeScreen';
import StartScreen from './components/StartScreen'; 
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import QuestionModal from './components/QuestionModal';

// Data & Types
import { QUESTIONS } from './constants';
import { type UserProfile, type UserAnswer, type Question } from './types';

function App() {
  const [screen, setScreen] = useState<'home' | 'start' | 'game' | 'question' | 'result'>('home');
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [askedQuestions, setAskedQuestions] = useState<{ [category: string]: Question[] }>({});
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const activeQuestion = currentCategory 
    ? QUESTIONS[currentCategory].find(q => !(askedQuestions[currentCategory] || []).some(asked => asked.id === q.id))
    : null;

  const handleStart = (userData: UserProfile) => {
    setUser(userData);
    setScreen('game');
  };

  const handleQuestionComplete = (earnedScore: number, selectedIndex: number) => {
    if (!activeQuestion || !currentCategory) return;

    const newAnswer: UserAnswer = {
      questionId: activeQuestion.id,
      questionText: activeQuestion.question,
      selectedOption: selectedIndex === -1 ? "Timed Out" : activeQuestion.options[selectedIndex],
      points: earnedScore
    };

    const currentAskedInCategory = askedQuestions[currentCategory] || [];
    const updatedAsked = { 
      ...askedQuestions, 
      [currentCategory]: [...currentAskedInCategory, activeQuestion] 
    };

    setScore(prev => prev + earnedScore);
    setUserAnswers(prev => [...prev, newAnswer]);
    setAskedQuestions(updatedAsked);

    // Check if there are more questions in the current module
    const hasMoreInLevel = QUESTIONS[currentCategory].some(q => 
      !([...currentAskedInCategory, activeQuestion].some(asked => asked.id === q.id))
    );

    if (hasMoreInLevel) {
      setScreen('question');
    } else {
      setCurrentCategory(null);
      // Dynamically check against the total number of categories (now 4 instead of 12)
      const completedLevels = Object.keys(updatedAsked).filter(cat => updatedAsked[cat].length === QUESTIONS[cat].length);
      const totalCategories = Object.keys(QUESTIONS).length;
      
      setScreen(completedLevels.length >= totalCategories ? 'result' : 'game');
    }
  };

  const handleRestart = () => {
    setScore(0);
    setUserAnswers([]);
    setAskedQuestions({});
    setScreen('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {screen === 'home' && <HomeScreen onStartClick={() => setScreen('start')} />}
      
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      
      {screen === 'game' && (
        <GameScreen 
          score={score} 
          askedQuestions={askedQuestions} 
          onSelectCategory={(cat: string) => { setCurrentCategory(cat); setScreen('question'); }} 
        />
      )}

      {/* The 'key' prop forces React to mount a fresh timer and clean options for every new question */}
      {screen === 'question' && activeQuestion && (
        <QuestionModal
          key={activeQuestion.id} 
          category={currentCategory!}
          question={activeQuestion}
          onSubmit={handleQuestionComplete}
        />
      )}

      {screen === 'result' && (
        <ResultScreen 
          score={score} 
          user={user} 
          userAnswers={userAnswers} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;