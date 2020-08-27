import React, {ReactNode} from "react";
import {IconButton} from "@material-ui/core";
import useLoggedInRouteStyles from "../pages/Base/styles/LoggedInRouteStyles";
import clsx from "clsx";

interface SimpleIconButtonProps {
    ariaLabel?: string,
    icon: ReactNode,
    onClick: () => void,
    disabled?: boolean,
    className?: string
}

const SimpleIconButton = (props: SimpleIconButtonProps) => {
    const classes = useLoggedInRouteStyles();

    const {ariaLabel, icon, onClick, disabled, className} = props;

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label={ariaLabel}
                onClick={onClick}
                className={clsx(classes.menuButton, className)}
                disabled={disabled}
            >
                {icon}
            </IconButton>
        </>
    );
};

export default SimpleIconButton;