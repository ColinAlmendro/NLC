import React from "react";
import {
	FormControl,
	InputLabel,
	Select as MuiSelect,
	MenuItem,
	FormHelperText,
} from "@mui/material";

export default function Select(props) {
	const { name, label, value, error = null, onChange, options } = props;

	// console.log("select options", options);

	return (
		<FormControl variant='outlined' {...(error && { error: true })}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect label={label} name={name} value={value} onChange={onChange}>
				<MenuItem value=''>None</MenuItem>
				{options.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						{item.name}
					</MenuItem>
				))}
			</MuiSelect>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	);
}
