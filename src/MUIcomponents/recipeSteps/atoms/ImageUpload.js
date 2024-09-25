import React, { useRef, useState, useEffect } from "react";
import { useAppState } from "../../../shared/context/app-context";
import {
	Box,
	Card,
	CardMedia,
} from "@mui/material";
import "./ImageUpload.css";

const ImageUpload = (props) => {
	const [file, setFile] = useAppState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);

	const filePickerRef = useRef();

	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		//props.onInput(props.id, pickedFile, fileIsValid);
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div className='form-control'>
			<input
				id={props.id}
				ref={filePickerRef}
				style={{ display: "none" }}
				type='file'
				accept='.jpg,.png,.jpeg'
				onChange={pickedHandler}
			/>
			<Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia component='img' image={previewUrl} alt='Preview' />
				</Card>
			</Box>
			
		</div>
	);
};

export default ImageUpload;
