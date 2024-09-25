import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";



function FieldInputText({ type = "text", name, label, control }) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				return (
					<TextField
						type={type}
						onChange={onChange}
						value={value}
						label={label}
						style={{ marginTop: "1px" }}
						// InputProps={{
						// 	inputProps: {
						// 		style: {
						// 			backgroundColor: "#E4E4F6",
						// 		},
						// 	},
						// }}
						size='small'
						helperText={`${error?.message ? error?.message : ""}`}
						error={!!error}
						// fullWidth
					/>
				);
			}}
		/>
	);
}

export default FieldInputText;
