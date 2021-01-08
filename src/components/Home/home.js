import {
    Grid,
    Paper,
    Tabs,
    Tab,
    Hidden,
    Container,
} from "@material-ui/core";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import GroupIcon from "@material-ui/icons/Group";
import React from "react";
import {useStyles} from "./useStyle";
import TabPanel from "./tabpanel";
import OnlineUsers from "../OnlineUsers/online-users";
import FinishedBoards from "../FinishedBoards/finishedBoards";
import Matching from "../Matching/matching";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import JoinRoom from "../JoinRoom/join-room";
import Header from "../Header/header";

const Home = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [onlineUsers, setOnlineUsers] = React.useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    };
    return (
        <>
            <Header homeActive={true}/>
            <Container className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper square>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="secondary"
                                aria-label="icon label tabs example"
                            >
                                <Tab
                                    icon={<GroupIcon label="active" {...a11yProps(0)} />}
                                    label="ACTIVE PLAYERS"
                                />
                                <Tab
                                    icon={<AccessAlarmsIcon label="recents" {...a11yProps(1)} />}
                                    label="RECENTS"
                                />
                            </Tabs>
                        </Paper>
                        <TabPanel value={value} index={0}>
                            <OnlineUsers onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <FinishedBoards/>
                        </TabPanel>
                    </Grid>
                    <Grid item xs={6} spacing={4}>
                        <Grid container spacing={1}>
                            <JoinRoom/>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Matching/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={9}>
                                <Hidden smDown>
                                    <img src="/img/caro.svg" className={classes.image} alt="Img"/>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
