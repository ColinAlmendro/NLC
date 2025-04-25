import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

export default function Popup(props) {
	const { title, children, openViewPopup, setOpenViewPopup } = props;

	return (
		<Dialog
			open={openViewPopup}
			fullWidth
			maxWidth='lg'
			sx={{ padding: "2px", position: "absolute", top: "5px" }}
		>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}
