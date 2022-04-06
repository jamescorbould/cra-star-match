import React, { useState, useEffect } from 'react';

const getLeaders = async () => {
  const response = await fetch('http://localhost:7190/api/LeaderBoard', {
    mode: 'cors',
  });
  const jsonData = await response.json();
  console.log('jsonData = ' + jsonData);
  console.log('leaders = ' + Array.from(jsonData.persons));
  return Array.from(jsonData.persons);
};

const LeaderBoard = (props) => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const leaders = await getLeaders();
      setLeaders(leaders);
    }
    fetchData();
  }, []);

  return (
    <div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date &amp; Time Played</th>
            <th>Completed Time (Secs)</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader) => {
            console.log(leader.name);
            return (
              <tr key={leader.id}>
                <td>{leader.name}</td>
                <td></td>
                <td>{leader.timeSecs}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot />
      </table>
    </div>
  );
};

export default LeaderBoard;
