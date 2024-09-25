import React from "react";
import {
	Stack,
	ImageList,
	ImageListItem,
	Box,
	ImageListItemBar,
} from "@mui/material";

function MuiImageList() {
	return (
		<Stack spacing={4}>
			<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
				{itemData.map((item) => (
					<ImageListItem key={item.img}>
						<img
							src={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2`}
							alt={item.title}
							loading='lazy'
						/>
						<ImageListItemBar title={item.title} />
					</ImageListItem>
				))}
			</ImageList>
			<ImageList
				variant='woven'
				sx={{ width: 500, height: 450 }}
				cols={3}
				gap={8}
			>
				{itemData.map((item) => (
					<ImageListItem key={item.img}>
						<img
							src={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2`}
							alt={item.title}
							loading='lazy'
						/>
					</ImageListItem>
				))}
			</ImageList>
			<Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
				<ImageList variant='masonary' cols={3} gap={8}>
					{itemData.map((item) => (
						<ImageListItem key={item.img}>
							<img
								src={`${item.img}?w=248&fit=crop&auto=format&dpr=2`}
								alt={item.title}
								loading='lazy'
							/>
						</ImageListItem>
					))}
				</ImageList>
			</Box>
		</Stack>
	);
}

// dummy data , props appended for unsplash "?w=164&h=164&fit=crop&auto=format&dpr=2`"
const itemData = [
	{
		img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
		title: "Breakfast",
	},
	{
		img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
		title: "Burger",
	},
	{
		img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
		title: "Camera",
	},
	{
		img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
		title: "Coffee",
	},
	{
		img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
		title: "Breakfast2",
	},
	{
		img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
		title: "Burger2",
	},
	{
		img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
		title: "Camera2",
	},
	{
		img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
		title: "Coffee2",
	},
];

export default MuiImageList;

//https://images.unsplash.com/photo-1509042239860-f550ce710b93
