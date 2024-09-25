import React from "react";
import { Stack, Rating } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function MuiRating() {
	const [rating, setRating] = useState(null);
	console.log({ rating });
	const handleChange = (event, newValue) => {
		setRating(newValue);
	};
	return (
		<Stack spacing={2}>
			<Rating
				value={rating}
				onChange={handleChange}
				precision={0.5}
				size='large'
				icon={<FavoriteIcon fontSize='inherit' color='error' />}
				emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
				//readonly
			/>
		</Stack>
	);
}

export default MuiRating;
