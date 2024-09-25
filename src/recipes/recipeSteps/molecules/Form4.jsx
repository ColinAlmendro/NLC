import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import FieldInputText from "../atoms/FieldInputText";
import { Box, Card, CardMedia, Button } from "@mui/material";
// import FieldImageUpload from "../atoms/FieldImageUpload";

function FormFour() {
	const { control } = useFormContext();
	// const [imagePreview, setImagePreview] = useState(null);

	// const handelChange = (event) => {
	// 	let file = event.target.files[0];
	// 	if (file) {
	// 		let reader = new FileReader();
	// 		reader.onloadend = () => {
	// 			setImagePreview(reader.result);
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// };
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);


	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);




	return (
		<Stack gap={2}>
			<Controller
				name={"image"}
				control={control}
				render={({
					field: { onChange, value, ...field },
					fieldState: { error },
				}) => {
					return (
						<div>
							<input
								{...field}
								value={value?.fileName}
								onChange={(event) => {
									onChange(event.target.files[0]);
									console.log("onChange", event.target.files[0]);
								}}
								
								type='file'
								id='image'
								//name="image"
							/>

							{previewUrl && (
								<Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
									<Card sx={{ maxWidth: 345 }}>
										<CardMedia
											component='img'
											image={previewUrl}
											alt='Preview'
										/>
									</Card>
								</Box>
							)}
						</div>
					);
				}}
			/>

			{/* <FieldImageUpload name='image' control={control} label='Image' /> */}
			<FieldInputText name='feeds' control={control} label='Servings' />
			<FieldInputText name='url' control={control} label='Website' />
			<FieldInputText name='cost' control={control} label='Cost' />
			<FieldInputText name='price' control={control} label='Price' />
		</Stack>
	);
}

export default FormFour;
