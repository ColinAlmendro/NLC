import React from "react";
import { TextField } from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Controller } from "react-hook-form";

function FieldInputTextarea({ type = "text", name, label, control }) {
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
						//sx={{ mb: 1 }}
						minRows={5}
						//maxRows={10}
						multiline='true'
						sx={{
							"& fieldset": { border: "none" },
							"& .MuiInputBase-root": {
								"& input": {
									textAlign: "left",
								},
							},
							//width: "200px",
							border: "1px solid",
						}}
					/>
				);
			}}
		/>
	);
}

export default FieldInputTextarea;
