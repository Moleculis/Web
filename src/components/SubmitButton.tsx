import React from "react";
import Button from "@material-ui/core/Button";
import formStyles from "../styles/FormStyle";
import {useTranslation} from "react-i18next";

interface SubmitButtonProps {
    text: string,
    disabled?: boolean
}

const SubmitButton = ({disabled, text}: SubmitButtonProps) => {
    const classes = formStyles();

    const {t} = useTranslation();

    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={disabled}
            >
                {disabled ? `${t("loading")}...` : text}
            </Button>
        </>
    );
};

export default SubmitButton;