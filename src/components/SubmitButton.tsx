import React from 'react';
import Button from "@material-ui/core/Button";
import formStyles from "../styles/FormStyle";

interface SubmitButtonProps {
    text: string,
    disabled?: boolean
}

const SubmitButton = ({disabled, text}: SubmitButtonProps) => {
    const classes = formStyles();
    return (
        <>
            <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={disabled}
            >
                {disabled ? 'Loading...' : text}
            </Button>
        </>
    );
};

export default SubmitButton;