import React from "react";
import { Stack, Skeleton, Box, Avatar, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const MuiSkeleton = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, []);
	});

	return (
		// <Stack spacing={1} width='250px'>
		// 	<Skeleton variant='text' animation={false} />
		// 	<Skeleton variant='circular' width={40} height={40} animation='wave' />
		// 	<Skeleton
		// 		variant='rectangular'
		// 		width={250}
		// 		height={125}
		// 		animation='wave'
		// 	/>
		// </Stack>
		<Box sx={{ width: "250px" }}>
			{loading ? (
				<Skeleton
					variant='rectangular'
					width={250}
					height={144}
					animation='wave'
				/>
			) : (
				<img
					src='https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c'
					alt='skeleton'
					width={250}
					height={144}
				/>
			)}
			<Stack
				direction='row'
				spacing={1}
				sx={{ width: "100%", marginTop: "12px" }}
			>
				{loading ? (
					<Skeleton
						variant='circular'
						width={40}
						height={40}
						animation='wave'
					/>
				) : (
					<Avatar>V</Avatar>
				)}
				<Stack sx={{ width: "80%" }}>
					{loading ? (
						<>
							<Typography variant='body1'>
								<Skeleton variant='text' width='100%' animation='wave' />
							</Typography>
							<Typography variant='body2'>
								<Skeleton variant='text' width='100%' animation='wave' />
							</Typography>
						</>
					) : (
						<>
							<Typography variant='body1'>React MUI Tutorial</Typography>
						</>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

export default MuiSkeleton;
