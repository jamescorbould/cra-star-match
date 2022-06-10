import React, { useState } from 'react';

const Arrow = (props) => {
  const [arrowState, setArrowState] = useState('up');

  const onClick = (currentArrowState) => {
    setArrowState(currentArrowState === 'up' ? 'down' : 'up');
    props.setShowLeaderBoard(arrowState === 'up' ? false : true);
  };

  return (
    <div>
      <button
        className={arrowState === 'up' ? 'arrowUp' : 'arrowDown'}
        onClick={() => onClick(arrowState)}
      ></button>
    </div>
  );
};

export default Arrow;
