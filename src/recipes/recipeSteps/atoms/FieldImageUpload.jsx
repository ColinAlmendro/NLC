import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Box, Card, CardMedia } from "@mui/material";
//import { useAppState } from "../../../shared/context/app-context";

function FieldImageUpload({ name, label, options, disabled, control }) {
	
	const [imagePreview, setImagePreview] = useState(null);



	const handelChange = (event) => {
		let file = event.target.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}

	};

	return (
		<Controller
			name={name}
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
								handelChange(event);
								// setImagePreview(URL.createObjectURL(event.target.files[0]));
								console.log("onChange", event.target.files[0]);
							}}
							type='file'
							id={name}
							name={name}
						/>

						{imagePreview && (
							<Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
								<Card sx={{ maxWidth: 345 }}>
									<CardMedia
										component='img'
										image={imagePreview}
										alt='Preview'
									/>
								</Card>
							</Box>
						)}
					</div>
				);
			}}
		/>
	);
}

export default FieldImageUpload;
