import React from "react";
import { Stack, Alert, AlertTitle, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const MuiAlert = () => {
	return (
		<Stack spacing={2}>
			<Alert severity='error'>Error</Alert>
			<Alert severity='warning'>Warning</Alert>
			<Alert severity='info'>Info</Alert>
			<Alert severity='success'>Success</Alert>

			<Alert variant='outlined' severity='error'>
				<AlertTitle>Error</AlertTitle>
				This is an error alert
			</Alert>
			<Alert variant='outlined' severity='warning'>
				<AlertTitle>Warning</AlertTitle>
				This is an warning alert
			</Alert>
			<Alert variant='outlined' severity='info'>
				<AlertTitle>Info</AlertTitle>
				This is an info alert
			</Alert>
			<Alert variant='outlined' severity='success'>
				<AlertTitle>Success</AlertTitle>
				This is a success alert
			</Alert>

			<Alert
				variant='filled'
				severity='error'
				onClose={() => alert("Close alert")}
			>
				Error
			</Alert>
			<Alert variant='filled' severity='warning'>
				Warning
			</Alert>
			<Alert variant='filled' severity='info'>
				Info
			</Alert>
			<Alert
				variant='filled'
				severity='success'
				icon={<CheckIcon fontSize='inherit' />}
				action={
					<Button color='inherit' size='small'>
						Undo
					</Button>
				}
			>
				Success
			</Alert>
		</Stack>
	);
};

export default MuiAlert;
