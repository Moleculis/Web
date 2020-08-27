import React from "react";
import {Button} from "@material-ui/core";

interface SimpleButtonProps {
    text: string,
    onClick: () => void,
    disabled?:boolean
}

const SimpleButton = ({text, onClick, disabled}: SimpleButtonProps) => {
    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </Button>
        </>
    );
};

export default SimpleButton;