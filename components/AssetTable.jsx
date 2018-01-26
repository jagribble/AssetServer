import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn,
} from 'material-ui/Table';

const getAssetRows = (data) => {
  if (data.length > 0) {
    return data.map((row) => {
      // const jsonRow = JSON.parse(row);
      return (
        <TableRow key={row.assetid}>
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
        {getAssetRows(props.data)}
      </TableBody>
    </Table>
  );
};

export default AssetTable;
