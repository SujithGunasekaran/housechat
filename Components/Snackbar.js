import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars(props) {

    const { show, message, handleSnackBarClose } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar open={show} autoHideDuration={4000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}