import React from "react";
import {Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useDividerStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const DividerWithMargin = () => {
    const classes = useDividerStyles();
    return <Divider className={classes.divider}/>;
};

export default DividerWithMargin;