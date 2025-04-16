import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ActionButton from "../../components/controls/ActionButton";
import CloseIcon from "@mui/icons-material/Close";

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

export default function CartPopup(props) {

    const { title, children, openCartPopup, setOpenCartPopup } = props;
    const classes = useStyles();

    return (
			<Dialog
				open={openCartPopup}
				maxWidth='lg'
				classes={{ paper: classes.dialogWrapper }}
				
			>
				
				<DialogContent dividers>{children}</DialogContent>
			</Dialog>
		);
}
