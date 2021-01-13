import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { apiGetFinishedGamesById } from "../../service/user-service";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
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
    width: 150,
    align: "center",
  },
];

export default function DataTable({ match }) {
  const [listGame, setListGame] = React.useState([]);

  React.useEffect(() => {
    apiGetFinishedGamesById(match.params.id)
      .then((res) => {
        if (res.status === 200) {
          setListGame(
            res.data.map((game, index) => ({
              id: index,
              xPlayer: game.xUsername,
              oPlayer: game.oUsername,
              winner: game.winner,
              time: new Date(game.time).toDateString()
            }))
          );
         // console.log("list games finished", res.data);
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
      <DataGrid rows={listGame} columns={columns} pageSize={5} />
    </div>
  );
}
