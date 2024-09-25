import React from "react";

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

function MuiAccordion() {
	const [expanded, setExpanded] = useState(false);

	const handelChange = (isExpanded, panel) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<div>
			<Accordion
				expanded={expanded === "panel1"}
				onChange={(event, isExpanded) => handelChange(isExpanded, "panel1")}
			>
				<AccordionSummary
					id='panel1-header'
					aria-controls='panel1-content'
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography>Accordion 1</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
						nostrum nesciunt placeat debitis omnis, excepturi illo corporis enim
						est quae distinctio. Quisquam cupiditate reprehenderit, consequuntur
						natus magni temporibus fugiat eveniet!
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === "panel2"}
				onChange={(event, isExpanded) => handelChange(isExpanded, "panel2")}
			>
				<AccordionSummary
					id='panel2-header'
					aria-controls='panel2-content'
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography>Accordion 2</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
						nostrum nesciunt placeat debitis omnis, excepturi illo corporis enim
						est quae distinctio. Quisquam cupiditate reprehenderit, consequuntur
						natus magni temporibus fugiat eveniet!
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === "panel3"}
				onChange={(event, isExpanded) => handelChange(isExpanded, "panel3")}
			>
				<AccordionSummary
					id='panel3-header'
					aria-controls='panel3-content'
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography>Accordion 3</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
						nostrum nesciunt placeat debitis omnis, excepturi illo corporis enim
						est quae distinctio. Quisquam cupiditate reprehenderit, consequuntur
						natus magni temporibus fugiat eveniet!
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default MuiAccordion;
