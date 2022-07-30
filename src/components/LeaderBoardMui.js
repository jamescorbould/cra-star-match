import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'timeSecs', headerName: 'Completed Time (Secs)', width: 200 },
];

const sortedLeaderBoard = (leaderBoard) => {
  const newLeaderBoard = [...leaderBoard];
  return newLeaderBoard.sort((a, b) => a.timeSecs - b.timeSecs);
};

const LeaderBoardMui = (props) => {
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={sortedLeaderBoard(props.leaderBoardList)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
        />
      </div>
    </>
  );
};

export default LeaderBoardMui;
