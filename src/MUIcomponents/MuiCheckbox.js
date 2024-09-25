import React from "react";
import {
	Box,
	FormControlLabel,
	Checkbox,
	FormControl,
	FormLabel,
	FormGroup,
    FormHelperText
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { useState } from "react";

function MuiCheckbox() {
	const [acceptTC, setAcceptTC] = useState(false);
	const [skills, setSkills] = useState([]);

	//console.log({ acceptTC });
	console.log({ skills });

	const handleTCChange = (event) => {
		setAcceptTC(event.target.checked);
	};

	const handleSkillChange = (event) => {
		const index = skills.indexOf(event.target.value);
		console.log(index, event.target.value);
		if (index === -1) {
			setSkills([...skills, event.target.value]);
		} else {
			setSkills(skills.filter((skill) => skill !== event.target.value));
		}
	};

	return (
		<Box>
			<Box>
				<FormControlLabel
					label='I accept terms and conditions'
					control={<Checkbox checked={acceptTC} onChange={handleTCChange} />}
				/>
			</Box>
			<Box>
				<Checkbox
					icon={<BookmarkBorderIcon />}
					checkedIcon={<BookmarkIcon />}
					checked={acceptTC}
					onChange={handleTCChange}
                    size="small"
                    color="secondary"
				/>
			</Box>
			<Box>
				<FormControl error>
					<FormLabel>Skills</FormLabel>
					<FormGroup row>
						<FormControlLabel
							label='HTML'
							control={
								<Checkbox
									value='html'
									checked={skills.includes("html")}
									onChange={handleSkillChange}
								/>
							}
						/>
						<FormControlLabel
							label='C#'
							control={
								<Checkbox
									value='csharp'
									checked={skills.includes("csharp")}
									onChange={handleSkillChange}
								/>
							}
						/>
						<FormControlLabel
							label='Javascript'
							control={
								<Checkbox
									value='javascript'
									checked={skills.includes("javascript")}
									onChange={handleSkillChange}
								/>
							}
						/>
					</FormGroup>
                    <FormHelperText>Invalid selection</FormHelperText>
				</FormControl>
			</Box>
		</Box>
	);
}

export default MuiCheckbox;
