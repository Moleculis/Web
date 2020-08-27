import React, {ReactNode} from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

interface DbBackupItemProps{
    icon: ReactNode,
    text: string,
    onClick: () => void
}

const DbBackupItem = ({icon, text, onClick}: DbBackupItemProps) => {
    return (
        <>
            <ListItem button onClick={onClick}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        </>
    );
};

export default DbBackupItem;