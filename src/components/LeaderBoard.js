import React from 'react';

const LeaderBoard = (props) => {
  return (
    <>
      <div className="leaderboard-banner">Leaderboard</div>
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
            {props.leaderBoardList.map((leader) => {
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
    </>
  );
};

export default LeaderBoard;
