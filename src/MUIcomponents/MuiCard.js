import React from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	CardMedia,
} from "@mui/material";

function MuiCard() {
	return (
		<Box width='300px'>
			<Card>
				<CardMedia
					component='img'
					height='140'
					image='https://cdn.pixabay.com/photo/2014/12/07/09/30/milky-way-559641_1280.jpg'
					alt='unsplash image'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						React
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic eius
						reiciendis animi consequuntur velit architecto amet praesentium
						earum deleniti minima quia fugit dicta unde dolores ullam
						perspiciatis, voluptatem explicabo delectus.
					</Typography>
				</CardContent>
				<CardActions>
					<Button size='small'>Share</Button>
					<Button size='small'>Learn more</Button>
				</CardActions>
			</Card>
		</Box>
	);
}

export default MuiCard;
