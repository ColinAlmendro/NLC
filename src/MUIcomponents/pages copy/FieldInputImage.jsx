import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
	Container,
	Button,
	TextField,
	Box,
	Card,
	CardMedia,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function FieldInputImage({ name, control, label }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	// const [file, setFile] = useState();
	const [imagePreview, setImagePreview] = useState(null);

	// const filePickerRef = useRef();

	// useEffect(() => {
	// 	console.log("F##", {file});
	// 	if (!file) {
	// 		return;
	// 	}
	// 	const fileReader = new FileReader();
	// 	fileReader.onload = () => {
	// 		setImagePreview(fileReader.result);
	// 	};
	// 	fileReader.readAsDataURL(file);
	// }, [file]);

	// const handleImageChange = (e) => {

	// 	if (e.target.files && e.target.files[0]) {
	// 		const file = e.target.files[0];

	// 		console.log("file", file);
	// 		//	console.log("e", e.target.value);
	// 		//file = file.replace("C:\\fakepath\\","")
	// 		//setImagePreview(URL.createObjectURL(file));
	// 		setFile(file);
	// 	}
	// };
	const imageValidation = {
		required: "An image file is required",
		validate: (fileList) => {
			if (fileList.length === 0) {
				return "An image file is required";
			}
			const file = fileList[0];
			const allowedTypes = [
				"image/jpeg",
				"image/png",
				"image/gif",
				"image/svg+xml",
			];
			console.log("filetype", file.type);
			// if (!allowedTypes.includes(file.type)) {
			// 	return "Invalid file type. Please select an image (jpeg, png, gif, svg).";
			// }
			return true;
		},
	};
	// const pickImageHandler = () => {
	// 	//console.log({ filePickerRef });
	// 	filePickerRef.current.click();
	// };

	//   const onSubmitFile = async () => {
	const onSubmitFile = () => {
		//setIsUploading(true);
		const inputFile = document.getElementById("fileInput");
		console.log(inputFile.files.item(0));
		setValue("image", inputFile?.files?.item(0));

		//	if (e.target.files && e.target.files[0]) {
		const file = inputFile.files.item[0];

		console.log("file", file);
		//	console.log("e", e.target.value);
		//file = file.replace("C:\\fakepath\\","")
		setImagePreview(URL.createObjectURL(file));
		//setFile(file);
		//	}
		// const formData = new FormData();
		// formData.append("file", inputFile?.files?.item(0));

		// const res = await axios.post<{ url: string }>(
		//   `${apiURL}/media/upload`,
		//   formData,
		//   {
		//     withCredentials: false,
		//     headers: {
		//       "Access-Control-Allow-Origin": "*",
		//     },
		//   },
		// );

		//setValue("thumbnail", res.data.url);
		//setIsUploading(false);
	};
	return (
		<form control={control}>
			{/* <Controller
				name='image'
				control={control}
				rules={imageValidation}
				defaultValue={undefined}
				render={({ field }) => ( */}

			{/*	// <TextField
					// 	{...field}
					// 	type='file'
					// 	label='Image'
					// 	ref={filePickerRef}
					// 	onChange={(e) => {
					// 		field.onChange(e);
					// 		handleImageChange(e);
					// 	}}
					// 	// onChange={(e) => {
					// 	// 	const file = e.target.files?.[0];
					// 	// 	field.onChange(e);
					// 	// 	setImagePreview(file ? URL.createObjectURL(file) : null);
					// 	// }}
					// 	InputLabelProps={{ shrink: true }}
					// 	variant='outlined'
					// 	fullWidth
					// 	margin='normal'
					// 	error={!!errors.image}
					// 	helperText={errors.image ? errors.image.message : ""}
					// />
			// 	)}
			// />*/}
			<div>
				<input id='fileInput' type='file' onChange={onSubmitFile} />
				<input type='hidden' {...register("image")} />
			</div>
			{imagePreview && (
				<Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
					<Card sx={{ maxWidth: 345 }}>
						<CardMedia component='img' image={imagePreview} alt='Preview' />
						<button type='button' onClick={pickImageHandler}>
							Save Image
						</button>
					</Card>
				</Box>
			)}
		</form>
	);
}

export default FieldInputImage;
