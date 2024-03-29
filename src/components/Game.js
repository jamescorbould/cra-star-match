import React, { useState, useEffect } from 'react';
import utils from '../math-utils';
import StarsDisplay from './StarsDisplay';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain';
import LeaderBoardForm from './LeaderBoardForm';
import Arrow from './Arrow';
import LeaderBoardMui from './LeaderBoardMui';

const getLeaders = async () => {
  const response = await fetch('http://localhost:7190/api/LeaderBoard', {
    mode: 'cors',
  });
  const jsonData = await response.json();
  return Array.from(jsonData.persons);
};

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [gameStatus, setGameStatus] = useState(
    availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active',
  );

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(
        () => setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1),
        1000,
      );
      setGameStatus('active');
      return () => {
        clearTimeout(timerId);
      };
    } else {
      setGameStatus(
        gameStatus === 'new'
          ? 'new'
          : availableNums.length === 0
          ? 'won'
          : secondsLeft === 0
          ? 'lost'
          : 'active',
      );
    }
  }, [secondsLeft, availableNums, gameStatus]);

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n),
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }

    setGameStatus(
      gameStatus === 'new'
        ? 'new'
        : availableNums.length === 0
        ? 'won'
        : secondsLeft === 0
        ? 'lost'
        : 'active',
    );
  };

  return {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    gameStatus,
    setGameStatus,
    setGameState,
  };
};

const Game = (props) => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    gameStatus,
    setGameStatus,
    setGameState,
  } = useGameState();

  const [leaderBoardList, setLeaderBoardList] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidateNums);
  };

  const [showLeaderBoard, setShowLeaderBoard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const leaders = await getLeaders();
      setLeaderBoardList(leaders);
    }
    fetchData();
    setShowLeaderBoard(true);
  }, []);

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
      {gameStatus === 'won' ? (
        <LeaderBoardForm
          timeSecs={10 - secondsLeft}
          setLeaderBoardList={setLeaderBoardList}
          setGameStatus={setGameStatus}
        />
      ) : null}
      <div className="arrow">
        <Arrow setShowLeaderBoard={setShowLeaderBoard} />
      </div>
      <div className="leaderboard-banner">Leaderboard</div>
      {showLeaderBoard ? (
        <LeaderBoardMui leaderBoardList={leaderBoardList} />
      ) : null}
    </div>
  );
};

export default Game;
