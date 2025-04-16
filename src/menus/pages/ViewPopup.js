import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Controls from "./controls/Controls";
// import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { title, children, openViewPopup, setOpenViewPopup } = props;
    const classes = useStyles();

    return (
			<Dialog
				open={openViewPopup}
				fullWidth
				maxWidth='lg'
				classes={{ paper: classes.dialogWrapper }}
			>
				
				<DialogContent>{children}</DialogContent>
			</Dialog>
		);
}
