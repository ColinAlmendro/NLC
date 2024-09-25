import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DateSelector(props) {
	const { name, label, value, onChange } = props;
	console.log(name, value);
	const convertToDefEventPara = (name, value) => ({
		target: {
			name,
			value,
		},
	});

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				disableToolbar
				variant='inline'
				inputVariant='outlined'
				label={label}
				format='dd/MM/yyyy'
				name={name}
				value={value}
				onChange={(date) => onChange(convertToDefEventPara(name, date))}
				sx={{
					"& fieldset": { border: "none" },
					"& .MuiInputBase-root": {
						"& input": {
							textAlign: "left",
						},
					},
					border: "none",
					 width: "300px",
				}}
			/>
		</LocalizationProvider>
	);
}
