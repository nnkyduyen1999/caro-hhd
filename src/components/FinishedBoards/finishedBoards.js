import React, {useEffect, useState} from 'react'
import socket from "../../socket.io/socket.io";

function FinishedBoards() {
    const [listRoom, setListRoom] = useState([]);
    useEffect(() => {
        socket.on("newRoomCreated", listRoom => {
            setListRoom([...listRoom]);
        });
        console.log("list room", listRoom);
    }, [listRoom]);
    return (
        <div>
            finishedBoards
        </div>
    )
}

export default FinishedBoards
