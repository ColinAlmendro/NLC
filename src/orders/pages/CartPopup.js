import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

export default function CartPopup(props) {
	const { title, children, openCartPopup, setOpenCartPopup } = props;

	return (
		<Dialog
			open={openCartPopup}
			maxWidth='lg'
			sx={{ padding: "2px", position: "absolute", top: "5px" }}
		>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
}
