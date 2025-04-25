import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	// IconButton,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import Controls from "./controls/Controls";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";

// const useStyles = makeStyles((theme) => ({
// 	dialog: {
// 		padding: theme.spacing(2),
// 		position: "absolute",
// 		top: theme.spacing(5),
// 	},
// 	dialogTitle: {
// 		textAlign: "center",
// 	},
// 	dialogContent: {
// 		textAlign: "center",
// 	},
// 	dialogAction: {
// 		justifyContent: "center",
// 	},
// 	titleIcon: {
// 		backgroundColor: theme.palette.secondary.light,
// 		color: theme.palette.secondary.main,
// 		"&:hover": {
// 			backgroundColor: theme.palette.secondary.light,
// 			cursor: "default",
// 		},
// 		"& .MuiSvgIcon-root": {
// 			fontSize: "8rem",
// 		},
// 	},
// }));

export default function ConfirmDialog(props) {
	const { confirmDialog, setConfirmDialog } = props;
	//const classes = useStyles();

	return (
		<Dialog
			open={confirmDialog.isOpen}
			sx={{
				padding: "2px",
				position: "absolute",
				top: "5px",
			}}
		>
			<DialogTitle sx={{ textAlign: "center" }}>
				{/* <IconButton disableRipple className={classes.titleIcon}>
					<NotListedLocationIcon />
				</IconButton> */}
			</DialogTitle>
			<DialogContent sx={{ textAlign: "center" }}>
				<Typography variant='h6'>{confirmDialog.title}</Typography>
				<Typography variant='subtitle2'>{confirmDialog.subTitle}</Typography>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "center" }}>
				<Controls.Button
					text='No'
					color='primary'
					onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
				/>
				<Controls.Button
					text='Yes'
					color='secondary'
					onClick={confirmDialog.onConfirm}
				/>
			</DialogActions>
		</Dialog>
	);
}
