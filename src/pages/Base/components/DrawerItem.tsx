import React, {ReactNode} from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface DrawerItemProps{
    goToRoute:string,
    icon: ReactNode,
    text:string
}

const useStyle = makeStyles((theme) => (
    {
        gutters: theme.mixins.gutters(),
    }
));

const DrawerItem = ({goToRoute,icon,text}:DrawerItemProps) => {
    const classes = useStyle();
    const history = useHistory();
    const goTo = (route: string) => {
        history.push(route);
    }

    return (
        <>
            <ListItem button onClick={() => goTo(goToRoute)} classes={{gutters: classes.gutters}}>
                <ListItemIcon >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
            </ListItem>
        </>
    );
};

export default DrawerItem;