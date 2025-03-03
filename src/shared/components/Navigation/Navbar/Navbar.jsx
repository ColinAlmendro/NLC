import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useValue } from "../../../context/SettingsProvider";
import { NavLink } from "react-router-dom";
import DropdownAdmin from "../Dropdown/DropdownAdmin";
import MenuIcon from "@mui/icons-material/Menu";
;
import "./Navbar.css";

function Navbar() {
	const { state, dispatch } = useValue();
	const auth = useContext(AuthContext);

	const [click, setClick] = useState(false);

	const [dropdownAdmin, setDropdownAdmin] = useState(false);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const onMouseEnterAdmin = () => {
		if (window.innerWidth < 800) {
			setDropdownAdmin(true);
		} else {
			setDropdownAdmin(true);
		}
	};
	const onMouseLeaveAdmin = () => {
		if (window.innerWidth < 800) {
			setDropdownAdmin(false);
		} else {
			setDropdownAdmin(false);
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
					<MenuIcon />
					<i className={click ? "fas fa-times" : "fas fa-bars"} />
				</div>

				<ul className={click ? "nav-menu active" : "nav-menu"}>
					{/* Admin */}
					{auth.isLoggedIn && auth.admin && (
						<li
							className='nav-item'
							onMouseEnter={onMouseEnterAdmin}
							onMouseLeave={onMouseLeaveAdmin}
						>
							<NavLink
								to='/admin'
								className='nav-links'
								
							>
								Admin <i className='fas fa-caret-down'></i>
							</NavLink>
							{dropdownAdmin && (
								<DropdownAdmin closeMobileMenu={closeMobileMenu} />
							)}
						</li>
					)}

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

					{/* 55555555555555555555555555555555555555555555555555555555555     LOGIN   */}
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
								onClick={() => {
									auth.logout();
									closeMobileMenu();
								}}
							>
								Logout
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
}
export default Navbar;
