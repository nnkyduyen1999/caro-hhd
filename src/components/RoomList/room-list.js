import React from 'react';
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RoomItem from "./room-item";

const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const RoomList = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Container style={{width: "80%", margin: 'auto', marginTop: 40, paddingBottom: 20}}>
                <Grid container spacing={5}>
                    {
                        rooms.map(item => (
                            <Grid item md={3}>
                                <RoomItem title={`Room ${item}`}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    title: {
        fontSize: 25,
        color: "#9F5A5A",
        marginTop: 30,
        // marginBottom: 5
    },
    link: {
        // color: colors.pink4,
        marginTop: 10,

    }
}));

export default RoomList;
