import React from "react";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

function MuiSwitch() {
	const [checked, setChecked] = useState(false);
	console.log({ checked });

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<Box>
			<FormControlLabel
				label='Dark mode'
				control={
					<Switch
						checked={checked}
						onChange={handleChange}
						size='small'
						color='success'
					/>
				}
			/>
		</Box>
		// a group of switches can me made the same way as the checkboxes just replace with switches
	);
}

export default MuiSwitch;
