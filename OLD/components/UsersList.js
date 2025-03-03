import React from "react";
import {
	Container,
	Paper,
	Typography,
	Box,
	Stack,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListSubheader,
	Grid,
	GridItem,
	Card,
	CardMedia,
	CircularProgress,
	Collapse,
} from "@mui/material";

import UserItem from "./UserItem";
// import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='center'>
				<Card>
					<h2>No users found.</h2>
				</Card>
			</div>
		);
	}

	return (
		// <div className='center'>
		// 	<Card>
		// 		<ul className='users-list1'>
		// 			{props.items.map((user) => (
		// 				<UserItem
		// 					key={user.id}
		// 					id={user.id}
		// 					// image={user.image}
		// 					name={user.name}
		// 					admin={user.admin}
		// 				/>
		// 			))}
		// 		</ul>
		// 	</Card>
		// </div>
		<>
			<Container id='container' sx={{ border: "none" }}>
				<Paper
					textAlign='center'
					// className={classes.pageContent}
					sx={{ width: "100%", p: 1 }}
				>
					<Box
						sx={{
							mx: "auto",
							textAlign: "center",
							p: 2,
							m: 0,
						}}
					>
						<Typography fontWeight='700' variant='h6'>
							Users
						</Typography>
					</Box>

					 	<Card>
		 		<ul className='users-list1'>
		 			{props.items.map((user) => (
		 				<UserItem
		 					key={user.id}
							id={user.id}
		 					// image={user.image}
		 					name={user.name}
		 					admin={user.admin}
		 				/>
		 			))}
		 		</ul>
		 	</Card>
				</Paper>
			</Container>
		</>
	);
};

export default UsersList;
