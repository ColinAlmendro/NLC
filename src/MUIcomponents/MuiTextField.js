import React from "react";
import { Stack, TextField, InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";

function MuiTextField() {
	const [value, setValue] = useState("");

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Stack spacing={4}>
			<Stack direction='row' spacing={2}>
				<TextField label='name' variant='outlined' />
				<TextField label='name' variant='filled' />
				<TextField label='name' variant='standard' />
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField label='Small secondary' size='small' color='secondary' />
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					label='Form Input'
					required
					value={value}
					onChange={(e) => setValue(e.target.value)}
					error={!value}
					helperText={!value ? "Required" : "Do not share password"}
				/>
				<TextField
					label='Password'
					type='password'
					helperText='Do not share password'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField label='Read only' InputProps={{ readOnly: true }} />
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					label='Amount'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
				/>
				<TextField
					label='Weight'
					InputProps={{
						endAdornment: <InputAdornment position='end'>Kg</InputAdornment>,
					}}
				/>
			</Stack>
		</Stack>
	);
}

export default MuiTextField;
