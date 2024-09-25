import React from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { categoryOptions } from "../utils/constants";
import FieldInputSelect from "../atoms/FieldInputSelect";
import FieldInputText from "../atoms/FieldInputText";

function FormOne() {
	const { control } = useFormContext();

	return (
		<Stack gap={2}>
			<FieldInputSelect
				name='category'
				label='Category'
				control={control}
				options={categoryOptions}
			/>
			<FieldInputText name='name' control={control} label='Recipe Name' />
			<FieldInputText
				name='description'
				control={control}
				label='Recipe Description'
			/>
		</Stack>
	);
}

export default FormOne;
