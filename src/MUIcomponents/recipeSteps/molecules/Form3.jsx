import React from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FieldInputTextarea from "../atoms/FieldInputTextarea";

function FormThree() {
	const { control } = useFormContext();

	return (
		<Stack gap={2}>
			<FieldInputTextarea
				name='instructions'
				label='Instructions'
				control={control}
			/>
		</Stack>
	);
}

export default FormThree;
