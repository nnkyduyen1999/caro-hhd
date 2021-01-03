import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {Link} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 5,
        boxShadow: "0px 10px 20px rgba(41, 41, 42, 0.07)",
    },
    media: {
        maxWidth: "100%",
        maxHeight: "150px",
        objectFit: "contain",
        margin: "auto",
    },
    title: {
        // color: colors.pink4,
        textAlign: "center",
        fontSize: "medium",
    },
    brandText: {
        // color: colors.gray4,
        textAlign: "center",
    },
    addIcon: {
        // color: colors.green1,
    },
    addButton: {
        position: "absolute",
        bottom: "3px",
        right: "3px",
    },
}));

const RoomItem = ({title}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea style={{ minHeight: "270px" }}>
                <Link href="#" style={{textDecoration: 'none'}}>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image="/img/caro.svg"
                        title={title}
                        // href="/product/1"
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            className={classes.title}
                            variant="h6"
                            component="h2"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            className={classes.brandText}
                            component="p"
                        >

                        </Typography>
                    </CardContent>
                </Link>
                {/*<CardActions className={classes.addButton}>*/}
                {/*    <IconButton onClick={props.onClick}>*/}
                {/*        <AddCircleIcon fontSize="large" className={classes.addIcon} />*/}
                {/*    </IconButton>*/}
                {/*</CardActions>*/}
            </CardActionArea>
        </Card>
    );
};

export default RoomItem;
