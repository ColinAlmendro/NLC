import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

function MuiSelect() {
	const [country, setCountry] = useState("");
	const [countries, setCountries] = useState([]);

	console.log({ country });
	console.log({ countries });

	const handleSingleChange = (event) => {
		setCountry(event.target.value);
	};
	const handleMultipleChange = (event) => {
		const value = event.target.value;
		setCountries(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<Box width='250px'>
			<TextField
				label='Select single country'
				select
				value={country}
				onChange={handleSingleChange}
				fullWidth
			>
				<MenuItem value='IN'>India</MenuItem>
				<MenuItem value='ZA'>South Africa</MenuItem>
				<MenuItem value='NZ'>New Zealand</MenuItem>
			</TextField>
			<TextField
				label='Select multiple countries'
				select
				value={countries}
				onChange={handleMultipleChange}
				fullWidth
				SelectProps={{ multiple: true }}
				size='small'
				color='secondary'
				helperText='Choose countries'
				error
			>
				<MenuItem value='IN'>India</MenuItem>
				<MenuItem value='ZA'>South Africa</MenuItem>
				<MenuItem value='NZ'>New Zealand</MenuItem>
			</TextField>
		</Box>
	);
}

export default MuiSelect;
