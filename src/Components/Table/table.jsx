import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Table (props){
    const {data} = props;
    const [tableData, setTableData] = React.useState({

        columns: {
            columnDefs: [{
              headerName: "Name", field: "name", pinned: 'left'
            }, {
              headerName: "PPG", field: "points"
            },{
              headerName: "REB", field: "rebounds"
            },{
              headerName: "Assists", field: "assists"
            },{
              headerName: "Steals", field: "steals"
            },{
              headerName: "Blocks", field: "blocks"
            },{
              headerName: "Fouls", field: "fouls"
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