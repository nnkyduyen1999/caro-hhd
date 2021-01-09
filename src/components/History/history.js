import React from 'react';
import Header from "../Header/header";
import PasswordModal from "../Modal/password-modal";

const History = () => {
    return (
        <>
            <Header historyActive={true}/>
            <PasswordModal/>
        </>
    );
};

export default History;
