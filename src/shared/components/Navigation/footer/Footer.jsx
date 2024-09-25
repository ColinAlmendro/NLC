import React, { useContext } from "react";
import { useValue } from "../../../context/SettingsProvider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
	const { state } = useValue();
	return (
		<Box
			component='footer'
			sx={{
				backgroundColor: (theme) =>
					theme.palette.mode === "light"
						? theme.palette.grey[200]
						: theme.palette.grey[800],
				p: 6,
			}}
		>
			<Container maxWidth='lg'>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={4}>
						<Typography variant='h6' color='text.primary' gutterBottom>
							About Us
						</Typography>
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
						<Link href={state.instagram} color='inherit' sx={{ pl: 1, pr: 1 }}>
							<Instagram />
						</Link>
					</Grid>
				</Grid>
				<Box mt={5}>
					<Typography variant='body2' color='text.secondary' align='center'>
						{"Copyright © "}
						NextLevelCuisine
						{new Date().getFullYear()}
						{"."}
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
