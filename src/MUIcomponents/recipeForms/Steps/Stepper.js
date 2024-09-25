import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppState } from "../../../shared/context/app-context";
import "../App.css";

const Stepper = ({ onStepChange }) => {
	const [state] = useAppState();
	const location = useLocation();
	const [steps, setSteps] = useState([]);

	useEffect(() => {
		setSteps((steps) => [...steps, location.pathname]);
	}, [location]);

	const getLinkClass = ({ isActive }) =>
		`nav-link ${isActive ? "active" : undefined}`;

	const contactInfoMissing =
		!state.firstName || !state.email || !state.password;

	const isVisited = (step) =>
		steps.includes(step) && location.pathname !== step;

	const navLinks = [
		{
			url: "/recipes/contact",
			name: "Contact",
			state: {
				showWarning: isVisited("/recipes/contact") && contactInfoMissing,
				showSuccess: isVisited("/recipes/contact") && !contactInfoMissing,
			},
		},
		{
			url: "/recipes/education",
			name: "Education",
			state: {
				showSuccess: isVisited("/recipes/education"),
			},
		},
		{
			url: "/recipes/about",
			name: "About",
			state: {
				showSuccess: isVisited("/recipes/about"),
			},
		},
		{
			url: "/recipes/confirm",
			name: "Confirm",
			state: {},
		},
	];

	return (
		<nav className='stepper navbar navbar-expand-lg'>
			<div className='collapse navbar-collapse'>
				<ol className='navbar-nav'>
					{navLinks.map(({ url, name, state }) => {
						return (
							<li className='step nav-item' key={url}>
								<StepState
									showWarning={state.showWarning}
									showSuccess={state.showSuccess}
								/>
								<NavLink
									end
									to={url}
									className={getLinkClass}
									onClick={onStepChange}
								>
									{name}
								</NavLink>
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
};

const StepState = ({ showWarning, showSuccess }) => {
	if (showWarning) {
		return <span className={"warning-sign"}>!</span>;
	} else if (showSuccess) {
		return (
			<div className='checkmark'>
				<div className='circle'></div>
				<div className='stem'></div>
				<div className='tick'></div>
			</div>
		);
	} else {
		return null;
	}
};

export default Stepper;