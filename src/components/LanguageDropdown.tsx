import React from 'react';
import {createStyles, FormControl, MenuItem, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            position: 'fixed',
            top: theme.spacing(1),
            right: theme.spacing(1)
        },
    }),
);

const LanguageDropdown = () => {
    const classes = useStyles();

    const [currentLanguage, setCurrentLanguage] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrentLanguage(event.target.value as number);
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={currentLanguage}
                    onChange={handleChange}
                >
                    <MenuItem value={0}>English</MenuItem>
                    <MenuItem value={1}>Українська</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default LanguageDropdown;