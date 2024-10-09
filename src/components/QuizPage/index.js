import React, { useState } from 'react';
import './index.css'

function TriviaGame({ recordPlayerScore }) {
  const [playerName, setPlayerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [points, setPoints] = useState(0);

  // Array of quiz questions with options and correct answers
  const quizData = [
    {
      questionText: 'Which country hosts the Eiffel Tower?',
      choices: ['Germany', 'Spain', 'France', 'Italy'],
      correctAnswer: 'France',
    },
    {
      questionText: 'Which planet is closest to the Sun?',
      choices: ['Earth', 'Venus', 'Mercury', 'Mars'],
      correctAnswer: 'Mercury',
    },
    {
      questionText: 'Who is the author of "The Odyssey"?',
      choices: ['Homer', 'Leo Tolstoy', 'J.R.R. Tolkien', 'Mark Twain'],
      correctAnswer: 'Homer',
    },
  ];

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  // Handles quiz form submission
  const handleAnswerSubmission = (e) => {
    e.preventDefault();
    if (selectedOption === quizData[activeQuestion].correctAnswer) {
      setPoints(points + 1);
    }
    setSelectedOption('');
    setActiveQuestion(activeQuestion + 1);
  };

  // Handles player name form submission
  const handlePlayerNameSubmit = (e) => {
    e.preventDefault();
    setNameSubmitted(true);
  };

  return (
    <div className="quiz-container">
      {!nameSubmitted ? (
        <form onSubmit={handlePlayerNameSubmit} className="name-form">
          <h2>Enter your name to begin the trivia</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
            className="input-field"
          />
          <button type="submit" className="start-btn">Start Trivia</button>
        </form>
      ) : (
        <div className="quiz-content">
          <h2>Welcome, {playerName}! Let's test your knowledge.</h2>
          {activeQuestion < quizData.length ? (
            <div className="question-block">
              <h3>
                Question {activeQuestion + 1}: {quizData[activeQuestion].questionText}
              </h3>
              <form onSubmit={handleAnswerSubmission}>
                {quizData[activeQuestion].choices.map((choice, index) => (
                  <div key={index} className="option">
                    <label>
                      <input
                        type="radio"
                        value={choice}
                        checked={selectedOption === choice}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        required
                      />
                      {choice}
                    </label>
                  </div>
                ))}
                <button type="submit" className="submit-btn">Submit Answer</button>
              </form>
            </div>
          ) : (
            <div className="result-block">
              <h3>You've completed the trivia! Your final score is: {points} / {quizData.length}</h3>
              <button
                onClick={() => recordPlayerScore(playerName, points)}
                className="submit-score-btn"
              >
                Submit Score
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TriviaGame;
