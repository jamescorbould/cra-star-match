import React from 'react';
// TODO: scrollbar for leaderboard plus try mui.
const LeaderBoard = (props) => {
  return (
    <>
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
