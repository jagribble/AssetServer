import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn,
} from 'material-ui/Table';
// import { Route } from 'react-router-dom';

const getAssetRows = (data, props) => {
  if (data.length > 0) {
    return data.map((row) => {
      return (
        <TableRow onTouchTap={() => { props.history.push(`/asset/${row.assetid}`); }} key={row.assetid}>
          <TableRowColumn>{row.assetid}</TableRowColumn>
          <TableRowColumn>{row.assetname}</TableRowColumn>
          <TableRowColumn>{row.assetx}</TableRowColumn>
          <TableRowColumn>{row.assety}</TableRowColumn>
        </TableRow>
      );
    });
  }
  return (
    <TableRow>
      <TableRowColumn style={{ textAlign: 'center' }}>No Assets</TableRowColumn>
    </TableRow>
  );
};


const AssetTable = (props) => {
  return (
    <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>lattitude</TableHeaderColumn>
          <TableHeaderColumn>longitude</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
      >
        {getAssetRows(props.data, props)}
      </TableBody>
    </Table>
  );
};

export default AssetTable;
