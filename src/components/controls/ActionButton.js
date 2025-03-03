import React from 'react'
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 0,
		margin: theme.spacing(0.5),
	},
	secondary: {
		backgroundColor: theme.palette.secondary.light,
		"& .MuiButton-label": {
			color: theme.palette.secondary.main,
		},
	},
	primary: {
		backgroundColor: theme.palette.primary.light,
		"& .MuiButton-label": {
			color: theme.palette.primary.main,
		},
	},
	error: {
		backgroundColor: theme.palette.primary.light,
		"& .MuiButton-label": {
			color: theme.palette.error.main,
		},
	},
	warning: {
		backgroundColor: theme.palette.primary.light,
		"& .MuiButton-label": {
			color: theme.palette.warning.main,
		},
	},
	success: {
		backgroundColor: theme.palette.primary.light,
		"& .MuiButton-label": {
			color: theme.palette.success.main,
		},
	},
}));

export default function ActionButton(props) {

    const { color, children, onClick ,disabled} = props;
    const classes = useStyles();

    return (
			<Button
				// variant='outlined'
				disabled={disabled}
				className={`${classes.root} ${classes[color]}`}
				onClick={onClick}
			>
				{children}
			</Button>
		);
}
