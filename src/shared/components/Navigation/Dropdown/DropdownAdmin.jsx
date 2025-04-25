import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminMenuItems } from "../NavMenuItems";
 import "./Dropdown.css";

export default function Dropdown(props) {

	const { closeMobileMenu } = props;

									const [click, setClick] = useState(false);
									const handleClick = () => setClick(!click);
									return (
										<>
											<ul
												
												className={
													click ? "dropdown-menu clicked" : "dropdown-menu"
												}
											>
												{AdminMenuItems.map((item, index) => {
													return (
														<li key={index}>
															<NavLink
																className={item.cName}
																to={item.path}
																onClick={
																	(() => setClick(false), closeMobileMenu)
																}
															>
																{item.title}
															</NavLink>
														</li>
													);
												})}
											</ul>
										</>
									);
								}
