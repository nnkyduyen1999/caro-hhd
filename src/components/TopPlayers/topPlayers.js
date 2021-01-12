import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "./styles";
import { Grid } from "@material-ui/core";
import Header from "../Header/header";
import { apiGetTopPlayers } from "../../service/user-service";
import Alert from "@material-ui/lab/Alert";

const columns = [
  { id: "name", label: "Player", minWidth: 170 },
  { id: "places", label: "Places", minWidth: 100, align: "center" },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "trophy",
    label: "Trophy",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "goals",
    label: "Goals",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];


export default function TopPlayers() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [msg, setMsg] = React.useState(null);
  const [listPlayer, setListPlayer] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    apiGetTopPlayers()
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          setListPlayer(res.data.map((user, index) => ({
              name: user.username,
              trophy: user.trophy,
              total: user.total,
              places: index + 1, 
              goals: user.winCount / user.total
          })))
        } else {
          setMsg("Error has occurred.");
        }
      })
      .catch((err) => {
        setMsg(err.response.data.message);
      });
  },[]);

  const renderErr = (err) => {
    if (!err) {
      return <></>;
    } else {
      return <Alert severity="error">{err}</Alert>;
    }
  };
  return (
    <>
      <Header topPlayerActive={true} />
      {renderErr(msg)}
      <Grid
        container
        flexDirection="column"
        justify="center"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
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
                {listPlayer
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
            count={listPlayer.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </>
  );
}
