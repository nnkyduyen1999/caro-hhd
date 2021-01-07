import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "./styles";
import { Grid } from "@material-ui/core";
const columns = [
    { id: 'name', label: 'Player', minWidth: 170 },
    { id: 'places', label: 'Places', minWidth: 100, align: 'center'},
    {
      id: 'total',
      label: 'Total',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'trophy',
      label: 'Trophy',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'goals',
      label: 'Goals',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(name, places, total, trophy) {
    const goals = total / trophy;
    return { name, places, total, trophy, goals };
  }
  
  const rows = [
    createData('India', '1', 1324171354, 3287263),
    createData('China', '2', 1403500365, 9596961),
    createData('Italy', '3', 60483973, 301340),
    createData('United States', '4', 327167434, 9833520),
    createData('Canada', '5', 37602103, 9984670),
    createData('Australia', '6', 25475400, 7692024),
    createData('Germany', '7', 83019200, 357578),
    createData('Ireland', '8', 4857000, 70273),
    createData('Mexico', '9', 126577691, 1972550),
    createData('Japan', '10', 126317000, 377973),
    createData('France', '11', 67022000, 640679),
    createData('United Kingdom', '12', 67545757, 242495),
    createData('Russia', '13', 146793744, 17098246),
    createData('Nigeria', '14', 200962417, 923768),
    createData('Brazil', '15', 210147125, 8515767),
  ];
  
  
export default function TopPlayers() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container flexDirection="column" justify="center" alignItems="center" style={{marginTop: 20}}>
      <Grid item xs={11}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
