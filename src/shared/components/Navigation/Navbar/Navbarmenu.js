import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useValue } from "../../../context/SettingsProvider";
import { NavLink, Link } from "react-router-dom";
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";
// import logo from "../../img/logo.png";

const Navbarmenu = () => {

    const auth = useContext(AuthContext);
    const { state, dispatch } = useValue();
	const [isMenu, setisMenu] = useState(false);
	const [isResponsiveclose, setResponsiveclose] = useState(false);
	const toggleClass = () => {
		setisMenu(isMenu === false ? true : false);
		setResponsiveclose(isResponsiveclose === false ? true : false);
	};

	let boxClass = ["main-menu menu-right menuq1"];
	if (isMenu) {
		boxClass.push("menuq2");
	} else {
		boxClass.push("");
	}

	const [isMenuSubMenu, setMenuSubMenu] = useState(false);

	const toggleSubmenu = () => {
		setMenuSubMenu(isMenuSubMenu === false ? true : false);
	};

	let boxClassSubMenu = ["sub__menus"];
	if (isMenuSubMenu) {
		boxClassSubMenu.push("sub__menus__Active");
	} else {
		boxClassSubMenu.push("");
	}

	return (
		<header className='header__middle'>
			<div className='container'>
				<div className='row'>
					{/* Add Logo  */}
					<div className='header__middle__logo'>
						<NavLink exact activeClassName='is-active' to='/'>
							{state.app_title}
							{/* <img src={logo} alt='logo' /> */}
						</NavLink>
					</div>

					<div className='header__middle__menus'>
						<nav className='main-nav '>
							{/* Responsive Menu Button */}
							{isResponsiveclose === true ? (
								<>
									<span
										className='menubar__button'
										style={{ display: "none" }}
										onClick={toggleClass}
									>
										{" "}
										<FiXCircle />{" "}
									</span>
								</>
							) : (
								<>
									<span
										className='menubar__button'
										style={{ display: "none" }}
										onClick={toggleClass}
									>
										{" "}
										<FiAlignRight />{" "}
									</span>
								</>
							)}

							<ul className={boxClass.join(" ")}>
								<li className='menu-item'>
									<NavLink
										exact
										activeClassName='is-active'
										onClick={toggleClass}
										to={`/`}
									>
										{" "}
										Home{" "}
									</NavLink>
								</li>
								<li className='menu-item '>
									<NavLink
										onClick={toggleClass}
										activeClassName='is-active'
										to={`/about`}
									>
										{" "}
										About{" "}
									</NavLink>{" "}
								</li>

								{/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Admin */}
								{auth.isLoggedIn && auth.admin && (
									<li
										onClick={toggleSubmenu}
										className='menu-item sub__menus__arrows'
									>
										{" "}
										<Link to='#'>
											{" "}
											Admin <FiChevronDown />{" "}
										</Link>
										<ul className={boxClassSubMenu.join(" ")}>
											<li>
												{" "}
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/ingredients`}
												>
													{" "}
													Ingredients{" "}
												</NavLink>{" "}
											</li>
											<li>
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/recipes`}
												>
													{" "}
													Recipes{" "}
												</NavLink>{" "}
											</li>
											<li>
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/menus`}
												>
													{" "}
													Menus{" "}
												</NavLink>{" "}
											</li>
											<li>
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/orders`}
												>
													{" "}
													Orders{" "}
												</NavLink>{" "}
											</li>
											<li>
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/customers`}
												>
													{" "}
													Customers{" "}
												</NavLink>{" "}
											</li>
											<li>
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/promotions`}
												>
													{" "}
													Promotions{" "}
												</NavLink>{" "}
											</li>
											<li>
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/users`}
												>
													{" "}
													Users{" "}
												</NavLink>{" "}
											</li>
											<li>
												<NavLink
													onClick={toggleClass}
													activeClassName='is-active'
													to={`/appsettings`}
												>
													{" "}
													Settings{" "}
												</NavLink>{" "}
											</li>
										</ul>
									</li>
								)}
								{/* 55555555555555555555555555555555555555555555555555555555555     LOGIN   */}
								{/* Login */}
								{!auth.isLoggedIn && (
									<li className='nav-item'>
										<NavLink
											to='/auth'
											//className='nav-links'
											activeClassName='is-active'
											onClick={toggleClass}
											//onClick={closeMobileMenu}
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
											//activeClassName='is-active'
											//onClick={closeMobileMenu}
											onClick={auth.logout}
										>
											Logout
										</NavLink>
									</li>
								)}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbarmenu;
