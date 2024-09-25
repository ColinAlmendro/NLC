import React from "react";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@mui/material";

const MuiTable = () => {
	return (
		<TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
			<Table aria-label='simple table' stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>First name</TableCell>
						<TableCell>Last name</TableCell>
						<TableCell align='center'>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map((row) => (
						<TableRow
							key={row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell>{row.id}</TableCell>
							<TableCell>{row.first_name}</TableCell>
							<TableCell>{row.last_name}</TableCell>
							<TableCell align='center'>{row.email}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const tableData = [
	{
		id: 1,
		first_name: "Gertruda",
		last_name: "Linfield",
		email: "glinfield0@mozilla.com",
		gender: "Genderqueer",
		ip_address: "26.226.104.54",
	},
	{
		id: 2,
		first_name: "Lorette",
		last_name: "Haime",
		email: "lhaime1@state.gov",
		gender: "Female",
		ip_address: "13.83.197.241",
	},
	{
		id: 3,
		first_name: "Bamby",
		last_name: "Chinnery",
		email: "bchinnery2@nydailynews.com",
		gender: "Non-binary",
		ip_address: "148.251.38.92",
	},
	{
		id: 4,
		first_name: "Charmian",
		last_name: "Glasson",
		email: "cglasson3@nyu.edu",
		gender: "Female",
		ip_address: "111.111.3.131",
	},
	{
		id: 5,
		first_name: "Lucky",
		last_name: "Gourlay",
		email: "lgourlay4@bizjournals.com",
		gender: "Female",
		ip_address: "124.68.44.115",
	},
	{
		id: 6,
		first_name: "Fernando",
		last_name: "Koppe",
		email: "fkoppe5@nba.com",
		gender: "Male",
		ip_address: "47.47.196.236",
	},
	{
		id: 7,
		first_name: "Chery",
		last_name: "Tullis",
		email: "ctullis6@wikispaces.com",
		gender: "Female",
		ip_address: "99.197.193.198",
	},
	{
		id: 8,
		first_name: "Gerhardine",
		last_name: "Shotbolt",
		email: "gshotbolt7@sakura.ne.jp",
		gender: "Female",
		ip_address: "162.255.178.15",
	},
	{
		id: 9,
		first_name: "Bab",
		last_name: "Denham",
		email: "bdenham8@infoseek.co.jp",
		gender: "Female",
		ip_address: "100.106.52.164",
	},
	{
		id: 10,
		first_name: "Olin",
		last_name: "Kitchingman",
		email: "okitchingman9@dagondesign.com",
		gender: "Male",
		ip_address: "124.241.208.153",
	},
];
export default MuiTable;
