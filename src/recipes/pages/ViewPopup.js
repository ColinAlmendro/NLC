import React from 'react'
import {
	Dialog,
	
	DialogContent,
	
} from "@mui/material";
// import { makeStyles } from "@mui/styles";


// const useStyles = makeStyles(theme => ({
//     dialogWrapper: {
//         padding: theme.spacing(2),
//         position: 'absolute',
//         top: theme.spacing(5)
//     },
//     dialogTitle: {
//         paddingRight: '0px'
//     }
// }))

export default function Popup(props) {

    const { title, children, openViewPopup, setOpenViewPopup } = props;
    // const classes = useStyles();

    return (
			<Dialog
				open={openViewPopup}
				fullWidth
				maxWidth='md'
				// classes={{ paper: classes.dialogWrapper }}
                sx={{padding:'2px',position: 'absolute',top:'5px'}}
			>
				
				<DialogContent>{children}</DialogContent>
			</Dialog>
		);
}
