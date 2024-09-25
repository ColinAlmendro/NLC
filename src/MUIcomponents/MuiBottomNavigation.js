import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import MuiTextField from "./MuiTextField";
import MuiImageList from "./MuiImageList";

const MuiBottomNavigation = () => {
	const [value, setValue] = useState(0);
	console.log({ value });

	let page;

	if (value === 1) {
		page = <MuiTextField />;
	}
	if (value === 2) {
		page = <MuiImageList />;
	}
	return (
		<>
			{page}

			<BottomNavigation
				sx={{ width: "100%", position: "absolute", bottom: 0 }}
				value={value}
				onChange={(event, newValue) => setValue(newValue)}
				showLabels
			>
				<BottomNavigationAction label='Home' icon={<HomeIcon />} />
				<BottomNavigationAction label='Favorite' icon={<FavoriteIcon />} />
				<BottomNavigationAction label='Profile' icon={<PersonIcon />} />
			</BottomNavigation>
		</>
	);
};

export default MuiBottomNavigation;
