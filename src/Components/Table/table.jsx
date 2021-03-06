import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";


//core components
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Table (props){
    const {data, tableColors} = props;
    const [tableData, setTableData] = React.useState({
        columns: {
            columnDefs: [{
              headerName: "Name", 
              field: "name", 
              pinned: 'left', 
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

  //  const rowClass = 'my-green-class';

//   const getRowStyle = params => {
//       console.log(rowColor);
//       if (params.node.rowIndex % 2 === 0) {
//           return { background:  rowColor};
//       }
//   };

  useEffect((props) =>{
      //
      if (data){
          setTableData({...tableData, rows: data});
          console.log(tableColors);
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
      >{tableColors ? 
      <AgGridReact
        columnDefs={tableData.columns.columnDefs}
        rowData={tableData.rows}
        rowStyle={tableColors}
        >
      </AgGridReact>: <h2>Please select team from Dropdown</h2>}

      </div>
    );

}


export default Table;