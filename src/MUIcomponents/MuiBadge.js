import React from "react";
import { Stack, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

const unreadEmails = ["email1", "email2"];

console.log(unreadEmails.length);

const MuiBadge = () => {
	return (
		<Stack spacing={2} direction='row'>
			<Badge badgeContent={unreadEmails.length} color='primary'>
				<MailIcon />
			</Badge>
			<Badge badgeContent={0} color='secondary' showZero>
				<MailIcon />
			</Badge>
			<Badge badgeContent={100} color='primary' max={999}>
				<MailIcon />
			</Badge>
			<Badge
				variant='dot'
				color='primary'
				invisible={unreadEmails.length === 0}
			>
				<MailIcon />
			</Badge>
		</Stack>
	);
};

export default MuiBadge;
