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
				<DialogTitle className={classes.dialogTitle}>
					<div style={{ display: "flex" }}>
						<Typography variant='h4' component='div' style={{ flexGrow: 1 }}>
							{title}
						</Typography>
						<ActionButton
							color='secondary'
							onClick={() => {
								setOpenCartPopup(false);
							}}
						>
							<CloseIcon />
						</ActionButton>
					</div>
				</DialogTitle>
				<DialogContent dividers>{children}</DialogContent>
			</Dialog>
		);
}
