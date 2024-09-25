import React from "react";
import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemAvatar,
	Avatar,
	ListItemButton,
	Divider,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

const MuiList = () => {
	return (
		<Box sx={{ width: "400px", bgcolor: "#efefef" }}>
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ListItemAvatar>
								<Avatar>
									<MailIcon />
								</Avatar>
							</ListItemAvatar>
						</ListItemIcon>
						<ListItemText primary='List item 1' />
					</ListItemButton>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary='List item 2' secondary='Secondary text' />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary='List item 3' secondary='Secondary text' />
				</ListItem>
			</List>
		</Box>
	);
};

export default MuiList;
