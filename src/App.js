import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';
import TriviaPage from './components/QuizPage';

function QuizApp() {
  const [contestants, setContestants] = useState([]);

  // Function to record player name and score in leaderboard
  const recordPlayerScore = (playerName, playerScore) => {
    setContestants((previousScores) => [...previousScores, { playerName, playerScore }]);
  };

  return (
    <Router>
      <div className="quiz-app-container">
        <Routes>
          {/* Home Page with QR Code and Leaderboard */}
          <Route
            path="/"
            element={
              <div className="home-page">
                <h1>Quiz Challenge Portal</h1>

                {/* Display QR Code for quiz access */}
                <QRCodeCanvas
                  value="http://192.168.209.28:3000/quiz"
                  size={180}
                  className="qr-code"
                />
                <p>Scan the QR code to access the quiz on your mobile device.</p>

                {/* Display leaderboard with player scores */}
                <h2>Leaderboard</h2>
                <ul className="leaderboard">
                  {contestants.length > 0 ? (
                    contestants.map((contestant, idx) => (
                      <li key={idx} className="player-entry">
                        {contestant.playerName}: {contestant.playerScore} points
                      </li>
                    ))
                  ) : (
                    <p className="no-players">No participants yet. Be the first to play!</p>
                  )}
                </ul>

                {/* Button to manually access quiz on desktop */}
                <Link to="/quiz" className="start-link">
                  <button className="start-quiz-btn">Start Quiz</button>
                </Link>
              </div>
            }
          />

          {/* Quiz Page */}
          <Route
            path="/quiz"
            element={<TriviaPage recordPlayerScore={recordPlayerScore} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default QuizApp;
