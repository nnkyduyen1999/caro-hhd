import React, { useContext } from 'react'
import { AuthenticationContext } from '../../providers/authenticationProvider'
import socket from '../../socket.io/socket.io'

const  OnlineUsers = (props) => {
    const authenticationContext = useContext(AuthenticationContext)
    
    socket.emit('new-connection', authenticationContext.authenState.userId)

    socket.on('new-user', (onlineUsers) => {
        console.log(onlineUsers)
    });

    return (
        <div>
            Online users
        </div>
    )
}

export default OnlineUsers
