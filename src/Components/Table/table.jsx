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
              headerName: "Career Points per Game", field: "points"
            },{
              headerName: "Career Rebounds per Game", field: "rebounds"
            },{
              headerName: "Career Assists per Game", field: "assists"
            },{
              headerName: "Career Steals per Game", field: "steals"
            },{
              headerName: "Career Blocks per Game", field: "blocks"
            },{
              headerName: "Career Fouls per Game", field: "fouls"
            }, {
              headerName: "Career Field Goal %", field: "fieldGoalPercentage"
            },{
              headerName: "Career Three Point %", field: "threePointPercentage"
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
        height: '320px',
        width: '1200px',
        fontSize: "15px"
       }}
      >
        <AgGridReact
          columnDefs={tableData.columns.columnDefs}
          rowData={tableData.rows}>
        </AgGridReact>
      </div>
    );

}

export default Table;