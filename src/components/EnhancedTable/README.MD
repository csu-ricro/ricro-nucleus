## EnhancedTable

[[Back to Docs](/../../#readme)]
[[Back to Components](../#readme)]

### Props

Any props not listed below will be spread to Material UI's `<Avatar>`.

*\* Required*

*\*\* Conditionally required*

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| api* | `object` | | Imported from the React Redux state
| ariaTableId* | `string` | | ID value for aria labeling for screen readers
| children* | `node` | | Table row render component. A prop `row` will be passed to this component.
| classes* | `string` | | Imported from Material UI's `withStyles()`
| columnData* | `array` | | Array of column header data. Must have the keys `id`(string), `label`(string). Optional keys are `disableSort`(boolean) and `tableCellProps`(object). `tableCellProps` are spread to [MUI's TableCell component](https://material-ui.com/api/table-cell/#tablecell-api)
| defaults.rowsPerPage | `number` | `10` | Number of rows per page by default. Must be `10`, `25`, `50`, or `100`.
| defaults.startPage | `number` | `0` | Page number to start with for pagination. Zero based.
| endpoint | `string` | | Path to API endpoint to fetch table data
| iconAdd | `object` | [`<MdiPlusCircle />`](https://materialdesignicons.com/icon/plus-circle) | Icon for navigation to adding a new record. Set to false to disable. Links to `<currentPath>/add`.
| iconFilter | `object` | [`<MdiFilter />`](https://materialdesignicons.com/icon/filter) | Icon for filter IconButton
| iconReload | `object` | [`<MdiReload />`](https://materialdesignicons.com/icon/reload) | Icon within the IconButton for reloading table content
| order | `string` | `"desc"` | Starting order direction
| orderBy* | `string` | | Column ID from `columnData` for the starting sort order
| searchKeys | `array` | | Array of objects with the structure `{ id: '<id>', label: '<label>' }` use for specifying which columns can be searched on. `id` must match a column ID from `columnData`.
| title* | `string` | | Title of the table
| uniqueDataKey | `string` | `"id"` | Key to uniquely identify each record. Must correspond to a key within the returned data from the API endpoint.


### Example

```jsx
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import MdiDelete from 'mdi-material-ui/Delete';
import MdiOpenInApp from 'mdi-material-ui/OpenInApp';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Table from '../../components/EnhancedTable';
import LinkedTableCell from '../../components/Table/LinkedTableCell';

const columnData = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'role', label: 'Position' },
  { id: 'age', label: 'Age', tableCellProps: { align: 'right' } },
  { id: 'actions', label: 'Actions', disableSort: true, tableCellProps: { align: 'center' } },
];
const searchKeys = columnData.filter(data => {
  return data.id !== 'actions' ? { id: data.id, label: data.label } : null;
});

const TableExample = ({ location }) => (
  <Table
    ariaTableId="user-group-types-table"
    columnData={columnData}
    endpoint="/nucleus/groups/type/"
    orderBy={searchKeys[0].id}
    title="User Group Types"
    searchKeys={searchKeys}
  >
    {({ row }) => {
      const to = `${location.pathname}/edit/${row.id}`;
      return (
        <TableRow hover>
          <LinkedTableCell to={to}>{row.id}</LinkedTableCell>
          <LinkedTableCell to={to}>{row.name}</LinkedTableCell>
          <LinkedTableCell to={to}>{row.role}</LinkedTableCell>
          <LinkedTableCell to={to} align="right">
            {row.age}
          </LinkedTableCell>
          <TableCell align="center">
            <Tooltip title={`Delete ${row.name}`}>
              <IconButton component={Link} to={to}>
                <MdiDelete />
              </IconButton>
            </Tooltip>
            <Tooltip title={`View ${row.name}`}>
              <IconButton component={Link} to={to}>
                <MdiOpenInApp />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    }}
  </Table>
);

TableExample.propTypes = {
  location: PropTypes.object.isRequired, // react-router withRouter()
};

export default withRouter(TableExample);
```

[[top](#readme)]