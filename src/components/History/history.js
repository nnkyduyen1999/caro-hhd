import Header from "../Header/header";
import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { apiGetFinishedGamesById } from "../../service/user-service";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import moment from "moment";
import { useHistory } from "react-router-dom";

const columns = [
  { field: "ord", headerName: "Ordinary", width: 120, align: "center" },
  { field: "xPlayer", headerName: "Player X", width: 150 },
  { field: "oPlayer", headerName: "Player O", width: 150 },
  {
    field: "winner",
    headerName: "Winner",
    width: 100,
    align: "center",
  },
  {
    field: "time",
    headerName: "Time",
    width: 200,
  },
];
const History = () => {
  const [listGame, setListGame] = React.useState([]);
  const { authenState } = React.useContext(AuthenticationContext);
  const history = useHistory();

  React.useEffect(() => {
    apiGetFinishedGamesById(authenState.userInfo._id)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setListGame(
            res.data.map((game, index) => ({
              id: game.id,
              ord: index + 1,
              xPlayer: game.xUsername,
              oPlayer: game.oUsername,
              winner: game.winner,
              time: moment(game.time).format("DD/MM/YY HH:MM:SS"),
            }))
          );
        } else {
          console.log("Err");
        }
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header historyActive={true} />
      <DataGrid
        rows={listGame}
        columns={columns}
        pageSize={5}
        onCellClick={(cell) => history.push(`/history/${cell.row.id}`)}
      />
    </div>
  );
};

export default History;
