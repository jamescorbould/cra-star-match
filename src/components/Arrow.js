import React from 'react';

const Arrow = (props) => {
  return (
    <div>
      <button
        class="arrowUp"
        onClick={() => props.onClick(props.number, props.status)}
      >
        {props.number}
      </button>
    </div>
  );
};

export default Arrow;
