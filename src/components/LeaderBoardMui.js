import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'timeSecs', headerName: 'Completed Time (Secs)', width: 200 },
];

const LeaderBoardMui = (props) => {
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={props.leaderBoardList}
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
