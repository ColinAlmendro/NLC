import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useValue } from "../../../context/SettingsProvider";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import DropdownMenus from "../Dropdown/DropdownMenus";
import DropdownIngredients from "../Dropdown/DropdownIngredients";
import DropdownRecipes from "../Dropdown/DropdownRecipes";
import DropdownMUI from "../Dropdown/DropdownMUI";
import "./Navbar.css";

function Navbar() {
	const { state, dispatch } = useValue();
	const auth = useContext(AuthContext);
	// console.log("loggedin:",auth.isLoggedIn);

	// State click menu-icon
	const [click, setClick] = useState(false);
	// State dropdown
	const [dropdownMenus, setDropdownMenus] = useState(false);
	const [dropdownIngredients, setDropdownIngredients] = useState(false);
	const [dropdownRecipes, setDropdownRecipes] = useState(false);
	const [dropdownMui, setDropdownMui] = useState(false);
	// const [dropdown, setDropdown] = useState(false);
	// Toggle menu-icon
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const onMouseEnterMenus = () => {
		if (window.innerWidth < 800) {
			setDropdownMenus(true);
		} else {
			setDropdownMenus(true);
		}
	};
	const onMouseLeaveMenus = () => {
		if (window.innerWidth < 800) {
			setDropdownMenus(false);
		} else {
			setDropdownMenus(false);
		}
	};

	const onMouseEnterIngredients = () => {
		if (window.innerWidth < 800) {
			setDropdownIngredients(true);
		} else {
			setDropdownIngredients(true);
		}
	};
	const onMouseLeaveIngredients = () => {
		if (window.innerWidth < 800) {
			setDropdownIngredients(false);
		} else {
			setDropdownIngredients(false);
		}
	};
	const onMouseEnterRecipes = () => {
		if (window.innerWidth < 800) {
			setDropdownRecipes(true);
		} else {
			setDropdownRecipes(true);
		}
	};
	const onMouseLeaveRecipes = () => {
		if (window.innerWidth < 800) {
			setDropdownRecipes(false);
		} else {
			setDropdownRecipes(false);
		}
	};
	const onMouseEnterMui = () => {
		if (window.innerWidth < 800) {
			setDropdownMui(true);
		} else {
			setDropdownMui(true);
		}
	};
	const onMouseLeaveMui = () => {
		if (window.innerWidth < 800) {
			setDropdownMui(false);
		} else {
			setDropdownMui(false);
		}
	};

	return (
		<>
			<nav className='navbar'>
				<NavLink to='/' className='navbar-logo'>
					{state.app_title}
					{/* Next Level Cuisine */}
				</NavLink>
				<div className='menu-icon' onClick={handleClick}>
					<i className={click ? "fas fa-times" : "fas fa-bars"} />
				</div>
				<ul className={click ? "nav-menu active" : "nav-menu"}>
					{/* Home */}
					<li className='nav-item'>
						<NavLink to='/' className='nav-links' onClick={closeMobileMenu}>
							Home
						</NavLink>
					</li>
					{/* About */}
					<li className='nav-item'>
						<NavLink
							to='/about'
							className='nav-links'
							onClick={closeMobileMenu}
						>
							About
						</NavLink>
					</li>

					{/* Menus */}
					{auth.isLoggedIn && (
						<li
							className='nav-item'
							onMouseEnter={onMouseEnterMenus}
							onMouseLeave={onMouseLeaveMenus}
						>
							<NavLink
								to='/menus'
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Menus <i className='fas fa-caret-down'></i>
							</NavLink>
							<li className='nav-item'>
								<NavLink
									to='/promotions'
									className='nav-links'
									onClick={closeMobileMenu}
								>
									Promotions
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='/appsettings'
									className='nav-links'
									onClick={closeMobileMenu}
								>
									Settings
								</NavLink>
							</li>
							{/* {dropdownMenus && <DropdownMenus />} */}
						</li>
					)}
					{/* Recipes */}
					{auth.isLoggedIn && (
						<li
							className='nav-item'
							onMouseEnter={onMouseEnterRecipes}
							onMouseLeave={onMouseLeaveRecipes}
						>
							<NavLink
								to='/recipes'
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Recipes <i className='fas fa-caret-down'></i>
							</NavLink>
							{/* {dropdownRecipes && <DropdownRecipes />} */}
						</li>
					)}
					{/* Ingredients */}
					{auth.isLoggedIn && (
						<li
							className='nav-item'
							onMouseEnter={onMouseEnterIngredients}
							onMouseLeave={onMouseLeaveIngredients}
						>
							<NavLink
								to='/ingredients'
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Ingredients <i className='fas fa-caret-down'></i>
							</NavLink>
							{dropdownIngredients && <DropdownIngredients />}
						</li>
					)}
					{/* Customers */}
					{auth.isLoggedIn && (
						<li
							className='nav-item'
							onMouseEnter={onMouseEnterMui}
							onMouseLeave={onMouseLeaveMui}
						>
							<NavLink
								to='/customers'
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Customers <i className='fas fa-caret-down'></i>
							</NavLink>

						</li>
					)}
					{/* Orders */}
					{auth.isLoggedIn && (
						<li
							className='nav-item'
							onMouseEnter={onMouseEnterMui}
							onMouseLeave={onMouseLeaveMui}
						>
							<NavLink
								to='/orders'
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Orders <i className='fas fa-caret-down'></i>
							</NavLink>

						</li>
					)}
					{/* Users */}
					<li className='nav-item'>
						<NavLink
							to='/users'
							className='nav-links'
							onClick={closeMobileMenu}
						>
							Users
						</NavLink>
					</li>
					{/* Login */}
					{!auth.isLoggedIn && (
						<li className='nav-item'>
							<NavLink
								to='/auth'
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Login
							</NavLink>
						</li>
					)}
					{auth.isLoggedIn && (
						<li className='nav-item'>
							<NavLink
								to='/'
								className='nav-links'
								//onClick={closeMobileMenu}
								onClick={auth.logout}
							>
								Logout
							</NavLink>
							{/* <Button onClick={auth.logout}>Logout</Button> */}
						</li>
					)}
					{/* <Button /> */}
				</ul>
			</nav>
		</>
	);
}
export default Navbar;
