import React from "react";
import {createStyles, FormControl, MenuItem, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {changeLanguage} from "../i18n";
import {getLanguage} from "../services/Storage";
import Language, {getLanguageAsset, getLanguageName} from "../utils/Language";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            position: "fixed",
            top: theme.spacing(1),
            right: theme.spacing(1),
        },
        img: {
            objectFit: "cover",
            width: 30,
            verticalAlign: "middle"
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
            <FormControl variant="standard" className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={currentLanguage}
                    onChange={handleChange}
                >
                    {Object.keys(Language).map((language: string) => {
                        return (
                            <MenuItem key={language} value={language}>
                                <img
                                    className={classes.img}
                                    src={getLanguageAsset(language)}
                                    alt={getLanguageName(language)}
                                />
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default LanguageDropdown;