import React, { useState } from 'react';

const LeaderBoardForm = (props) => {
  const [name, setName] = useState([]);
  const [id, setId] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, timeSecs: props.timeSecs.toString() }),
    };

    const response = await fetch(
      'http://localhost:7190/api/LeaderBoard',
      requestOptions,
    );

    const leader = await response.json();
    setId(leader.id);

    const response2 = await fetch('http://localhost:7190/api/LeaderBoard', {
      mode: 'cors',
    });

    const leaders = await response2.json();

    props.setLeaderBoardList(Array.from(leaders.persons));
    //props.setGameStatus('new');

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
