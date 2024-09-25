import React from "react";
import { Stack, Autocomplete, TextField } from "@mui/material";

import { useState } from "react";

const skills = ["HTML", "C#", "CSS", "Javascript", "Typescript"];

const skillsOptions = skills.map((skill, index) => ({
	id: index + 1,
	label: skill,
}));

function MuiAutocomplete() {
	const [value, setValue] = useState(null);
	const [skill, setSkill] = useState(null);
	const [multi, setMulti] = useState([]);

	console.log({ value });
	console.log({ skill });
	console.log({ multi });

	const handleMultipleChange = (event, newValue) => {
		setMulti(newValue);
		//const value = event.target.value;
		// setMulti(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<Stack spacing={2} width='250px'>
			<Autocomplete
				options={skills}
				renderInput={(params) => <TextField {...params} label='Skills' />}
				value={value}
				onChange={(event, newValue) => setValue(newValue)}
				freeSolo
			/>
			<Autocomplete
				options={skillsOptions}
				renderInput={(params) => <TextField {...params} label='SkillOptions' />}
				value={skill}
				onChange={(event, newSkill) => setSkill(newSkill)}
			/>
			<Autocomplete
				options={skills}
				renderInput={(params) => <TextField {...params} label='SkillsMulti' />}
				value={multi}
				onChange={handleMultipleChange}
				freeSolo
				multiple
			/>
		</Stack>
	);
}

export default MuiAutocomplete;
