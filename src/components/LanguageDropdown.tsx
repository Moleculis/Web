import React from "react";
import {createStyles, FormControl, MenuItem, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {changeLanguage, getLanguageAsset} from "../i18n";
import {getLanguage} from "../services/Storage";
import Language from "../utils/Language";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            position: "fixed",
            top: theme.spacing(1),
            right: theme.spacing(1)
        },
    }),
);

const LanguageDropdown = () => {
    const classes = useStyles();

    const [currentLanguage, setCurrentLanguage] = React.useState(getLanguage());

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const language: Language = event.target.value as Language;
        changeLanguage(language).then(() => {
            setCurrentLanguage(language);
        });
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
                    {Object.keys(Language).map((language: string) => {
                        return (
                            <MenuItem value={language}>{getLanguageAsset(language)}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default LanguageDropdown;