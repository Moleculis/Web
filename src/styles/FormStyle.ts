import {makeStyles} from "@material-ui/core/styles";

const formStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    formBig: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    legend: {
        marginBottom: theme.spacing(1)
    },
    legendBlock: {
        marginTop: theme.spacing(2),
    }
}));

export default formStyles;