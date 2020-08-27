import React, {ReactNode} from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

interface DbBackupItemProps{
    icon: ReactNode,
    text: string
}

const DbBackupItem = ({icon, text}: DbBackupItemProps) => {
    return (
        <>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        </>
    );
};

export default DbBackupItem;