import {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const {authenState} = useContext(AuthenticationContext);

    useEffect(() => {
        socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === authenState.userInfo._id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });
    }, [roomId]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (messageBody) => {
        socket.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: authenState.userInfo._id,
            senderName: authenState.userInfo.username,
            roomId
        });
    };

    return { messages, sendMessage };
};

export default useChat;
