import React from "react";
import { Snackbar, Button, Alert } from "@mui/material";
import { useState, forwardRef } from "react";

//custom alert
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
	return <Alert elevation={6} ref={ref} {...props} />;
});

const MuiSnackbar = () => {
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	return (
		<>
			<Button onClick={() => setOpen(true)}>Submit</Button>
			{/* <Snackbar
				message='Form submitted'
				autoHideDuration={4000}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			/> */}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<SnackbarAlert onClose={handleClose} severity='success'>
					Form submitted
				</SnackbarAlert>
			</Snackbar>
		</>
	);
};

export default MuiSnackbar;
