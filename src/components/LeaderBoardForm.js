import React, { useState, useEffect } from 'react';

const LeaderBoardForm = (props) => {
  const [name, setName] = useState([]);
  const [id, setId] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, timeSecs: props.timeSecs.toString() }),
    };

    fetch('http://localhost:7190/api/LeaderBoard', requestOptions)
      .then((response) => response.json())
      .then((data) => setId(data.id));

    alert('Thanks!');
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Please enter your name</p>
            <input name="name" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>{props.timeSecs}</label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaderBoardForm;
