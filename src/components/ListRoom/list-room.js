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
import PasswordModal from "../Modal/password-modal";
import { useHistory } from "react-router-dom";
import socket from "../../socket.io/socket.io";
import {
  START_GAME,
  UPDATE_CURRENT_PLAYER,
} from "../../socket.io/socket-event";
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
  console.log(props.data);
  // const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roomId, setRoomId] = useState("");
  const [roomPass, setRoomPass] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();

  // setRows(props.data)

  // console.log('row', rows)

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
        password: item.password,
      };
    });
  };

  socket.on(UPDATE_CURRENT_PLAYER, (data) => {
    const index = props.data.findIndex((item) => item._id === data.roomId);
    if (index !== -1) {
      let temp = [...props.data];
      temp[index][data.player === "X" ? "xPlayerUsername" : "oPlayerUsername"] =
        data.user.username;
      temp[index][data.player === "X" ? "xCurrentPlayer" : "oCurrentPlayer"] =
        data.user._id;
      props.setData(temp);
    }
  });

  socket.on(START_GAME, (roomId) => {
    const index = props.data.findIndex((item) => item._id === roomId);
    if (index !== -1) {
      let temp = [...props.data];
      temp[index]["isPlaying"] = true;
      props.setData(temp);
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                // console.log(row);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={() => {
                      if (row.password) {
                        setRoomId(row.id);
                        setRoomPass(row.password);
                        handleOpen();
                      } else history.push(`/room/${row.id}`);
                    }}
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
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <PasswordModal
        roomId={roomId}
        roomPass={roomPass}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Paper>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ListRoom;
