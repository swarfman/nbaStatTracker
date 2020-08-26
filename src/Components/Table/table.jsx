import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Table (props){
    const {data} = props;
    const [tableData, setTableData] = React.useState({

        columns: {
            columnDefs: [{
              headerName: "Name", field: "name"
            }, {
              headerName: "Points per Game", field: "points"
            },{
              headerName: "Rebounds per Game", field: "rebounds"
            },{
              headerName: "Assists per Game", field: "assists"
            },{
              headerName: "Steals per Game", field: "steals"
            },{
              headerName: "Blocks per Game", field: "blocks"
            },{
              headerName: "Fouls per Game", field: "fouls"
            }, {
              headerName: "Field Goal %", field: "fieldGoalPercentage"
            },{
              headerName: "Three Point %", field: "threePointPercentage"
            },
        ]},
        });

  useEffect((props) =>{
      //
      if (data){
          setTableData({...tableData, rows: data});
     }
    
  }, [data]);


    return (
      <div
        className="ag-theme-alpine"
        style={{
        height: '300px',
        width: '800px' }}
      >
        <AgGridReact
          columnDefs={tableData.columns.columnDefs}
          rowData={tableData.rows}>
        </AgGridReact>
      </div>
    );

}

export default Table;