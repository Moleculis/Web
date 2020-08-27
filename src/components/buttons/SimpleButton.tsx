import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface SimpleButtonProps {
    text: string,
    onClick: () => void,
    disabled?:boolean
}

const useSimpleButtonStyle = makeStyles((theme) => ({
    button: {
        maxWidth: theme.spacing(20),
    }
}));

const SimpleButton = ({text, onClick, disabled}: SimpleButtonProps) => {
    const classes = useSimpleButtonStyle();
    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={onClick}
                disabled={disabled}
                className={classes.button}
            >
                {text}
            </Button>
        </>
    );
};

export default SimpleButton;