import React from 'react';
import Header from "../Header/header";
import {Typography} from "@material-ui/core";

const History = () => {
    return (
        <>
            <Header historyActive={true}/>
            <Typography variant={"h1"}>HISTORY</Typography>
        </>
    );
};

export default History;
