import React from 'react';

const getLeaders = () => {
	const jsonData = require('./leaderboard.json');
	return Array.from(jsonData.leaders);
};

const LeaderBoard = (props) => {
	const leaders = getLeaders();

	return (
		<div>
			<table className="leaderboard-table">
				<thead>
					<tr>
						<th>Namex</th>
						<th>Date &amp; Time Played</th>
						<th>Completed Time (Secs)</th>
					</tr>
				</thead>
				<tbody>
					{
						leaders.map((leader) => {
							return <tr key={leader.id}><td>{leader.name}</td><td></td><td>{leader.timeSecs}</td></tr>;
						})
					}
				</tbody>
				<tfoot />
			</table>
		</div>
	);
};

export default LeaderBoard;
