 import React, { useContext,useState } from "react";
 import LoadingSpinner from "../../src/shared/components/UIElements/LoadingSpinner.js";
import { useValue } from "../shared/context/SettingsProvider";
import {
	Container,
	Box,
	Stack,
	Divider,
	Grid,
	Paper,
	Typography,
	Link,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

function About() {
	const [isLoading, setIsLoading] = useState(false);
	const { state, dispatch } = useValue();

	console.log("about state", state);
	return (
		<Container sx={{ border: "none" }}>
			<Paper>
				{isLoading && <LoadingSpinner asOverlay />}
				<Box display='flex' p={2}>
					<Stack spacing={2}>
						<Grid item xs={12} sm={4}>
							<Typography variant='h6' color='text.primary' gutterBottom>
								About Us
							</Typography>
							<Divider orientation='horizontal' flexItem />
							<Stack
								sx={{ border: "none", width: "100%" }}
								direction='row'
								spacing={2}
								divider={<Divider orientation='horizontal' flexItem />}
							>
								<div>
									<img
										src={state.about_image}
										alt='About us'
										loading='lazy'
										style={{ height: "250px" }}
									/>
								</div>
								<Stack spacing={2}>
									<Typography variant='body1' component='p' gutterBottom>
										{state.about_intro}
									</Typography>
									<Typography variant='body1' component='p' gutterBottom>
										{state.about_text}
									</Typography>
								</Stack>
							</Stack>

							{/* <Divider orientation='horizontal' flexItem /> */}

							{/* <Typography variant='body1' component='p' gutterBottom>
								{state.about_text}
							</Typography> */}
							<Typography variant='body2' color='text.secondary'>
								{/* We are humble chefs, dedicated to making life delicious */}
								{state.footer_about}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography variant='h6' color='text.primary' gutterBottom>
								Contact Us
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{/* Cape Towns deep south */}
								{state.contact_location}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{/* Email: nextlevelcuisine@gmail.com */}
								{`Email: ${state.contact_email}`}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{/* Phone: +27 084 2078305 */}
								{`Phone: ${state.contact_cellphone}`}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography variant='h6' color='text.primary' gutterBottom>
								Follow Us
							</Typography>
							<Link href={state.facebook} color='inherit'>
								<Facebook />
							</Link>
							<Link
								href={state.instagram}
								color='inherit'
								sx={{ pl: 1, pr: 1 }}
							>
								<Instagram />
							</Link>
						</Grid>
					</Stack>
				</Box>
			</Paper>
		</Container>
	);
}

export default About;
