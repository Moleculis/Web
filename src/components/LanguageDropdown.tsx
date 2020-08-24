import React from "react";
import {createStyles, FormControl, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {changeLanguage} from "../i18n";
import {getLanguage} from "../services/Storage";
import Language, {getLanguageAsset, getLanguageName} from "../utils/Language";

const useStyles = (iconColor: string | undefined) => makeStyles((_) =>
    createStyles({
        img: {
            objectFit: "cover",
            width: 30,
            verticalAlign: "middle"
        },
        icon: {
            fill: iconColor,
        },
    }),
);

interface LanguageDropdownProps {
    className?: string,
    selectClassName?: string,
    iconColor?: string
}

const LanguageDropdown = ({className, selectClassName, iconColor}: LanguageDropdownProps) => {
    const classes = useStyles(iconColor)();

    const [currentLanguage, setCurrentLanguage] = React.useState(getLanguage());

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const language: Language = event.target.value as Language;
        changeLanguage(language).then(() => {
            setCurrentLanguage(language);
        });
    };

    return (
        <div>
            <FormControl variant="standard" className={className}>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={currentLanguage}
                    onChange={handleChange}
                    className={selectClassName}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        }
                    }}
                    disableUnderline
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