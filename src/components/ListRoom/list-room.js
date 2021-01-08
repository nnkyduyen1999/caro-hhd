import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import LockIcon from "@material-ui/icons/Lock";

const columns = [
  { id: "lock" },
  { id: "id", label: "ID" },
  { id: "xPlayer", label: "X Player" },
  {
    id: "oPlayer",
    label: "O Player",
    // minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    // minWidth: 170,
    // align: "right",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  // container: {
  //   maxHeight: 440,
  // },
  layoutRoot: {
    // backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    alignItems: "center",

    height: "100%",
    overflow: "auto",
  },
}));

const ListRoom = (props) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const mapDataToRow = (data) => {
    return data.map(function (item) {
      const status = item.isPlaying
        ? "Đang chơi"
        : item.xCurrentPlayer && item.oCurrentPlayer
        ? "Đang chờ"
        : "Đang đợi thêm người chơi";
      const lock = item.password === "" ? "" : <LockIcon fontSize="small" />;
      return {
        lock: lock,
        id: item._id,
        xPlayer: item.xPlayerUsername,
        oPlayer: item.oPlayerUsername,
        status: status,
      };
    });
  };

  //   useEffect(() => {
  //     loadAllRoom();
  //   }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    // <div className={classes.layoutRoot}>
    //   <div className={classes.wrapper}>
    //     <div className={classes.contentContainer}>
    //       <div className={classes.content}>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mapDataToRow(props.data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
    </Paper>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ListRoom;
