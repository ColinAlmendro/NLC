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
						size='small'
						helperText={`${error?.message ? error?.message : ""}`}
						error={!!error}
						fullWidth
						sx={{
							"& fieldset": { border: "none" },
							"& .MuiInputBase-root": {
								"& input": {
									textAlign: "left",
								},
							},
							//width: "100px",
							border: "1px solid",
						}}
					/>
				);
			}}
		/>
	);
}

export default FieldInputText;
