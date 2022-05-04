import React, { useState } from 'react';

const getLeaders = async () => {
  const response = await fetch('http://localhost:7190/api/LeaderBoard', {
    mode: 'cors',
  });
  const jsonData = await response.json();
  console.log('jsonData = ' + jsonData);
  console.log('leaders = ' + Array.from(jsonData.persons));
  return Array.from(jsonData.persons);
};

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

    fetch('http://localhost:7190/api/LeaderBoard/{id}', {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) =>
        props.setLeaderBoardList((previousList) => [
          ...previousList,
          ...data.persons,
        ]),
      );

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
