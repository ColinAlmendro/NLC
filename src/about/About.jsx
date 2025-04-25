import React, { useState } from "react";

import { useValue } from "../shared/context/SettingsProvider";
import {
	Container,
	Box,
	Stack,
	Divider,
	Grid,
	Paper,
	Typography,
	CircularProgress,
} from "@mui/material";

import Footer from "./AboutFooter.jsx";

function About() {
	const [isLoading, setIsLoading] = useState(false);
	const { state, dispatch } = useValue();

	if (isLoading) {
			return (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			);
		}
	return (
		<Container sx={{ border: "none" }}>
			<Paper>
				
				<Box display='flex' p={2}>
					<Grid
						container
						rowSpacing={1}
						columnSpacing={0}
						sx={{ border: "none" }}
					>
						<Grid item xs={12} lg={12}>
							<Box
								sx={{
									mx: "auto",
									textAlign: "center",
									p: 2,
									m: 0,
								}}
							>
								<Typography fontWeight='700' variant='h5'>
									About Us
								</Typography>
							</Box>
						</Grid>

								<Grid item xs={12} lg={2}>
									<div>
										<img
											src={state.about_image}
											alt='About us'
											loading='lazy'
											style={{ height: "240px" }}
										/>
									</div>
								</Grid>
								<Grid item xs={12} lg={10}>
									<Stack spacing={2}>
										<Typography variant='body1' component='p' gutterBottom>
											{state.about_intro}
										</Typography>
										<Box
											sx={{
												mx: "auto",
												textAlign: "center",

											}}
										>
											<Divider
												orientation='horizontal'
												sx={{
													mx: "auto",
													textAlign: "center",

												}}
											/>
										</Box>
										<Typography variant='body1' component='p' gutterBottom>
											{state.about_text}
										</Typography>
									</Stack>
								</Grid>
			

						<Grid item xs={12} lg={12}>
							<Box
								sx={{
									mx: "auto",
									textAlign: "center",
									p: 2,
									m: 0,
								}}
							>
								<Typography variant='body2' color='text.secondary'>
									{state.footer_about}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} lg={12}>
							<Footer classname='footer' />
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Container>
	);
}

export default About;
