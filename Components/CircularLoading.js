import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function CircularLoading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress className="topic_post_circular_loading" />
        </div>
    );
}