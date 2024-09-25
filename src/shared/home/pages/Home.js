import React, { useContext } from "react";
import { useValue } from "../../context/SettingsProvider";
// import homeImage from "../../../assets/images/home/home.jpg";
// import logo from "../../../assets/images/home/logo.jpg";
import Footer from "../../components/Navigation/footer/Footer";
import "./Home.css";

const Home = () => {
	const { state, dispatch } = useValue();
	// console.log( "homestate",state );
	return (
		<React.Fragment>
			<div>
				<div
					className='banner-container'
					style={{ backgroundImage: `url(${state.home_bg_image})` }}
				>
					<img src={state.home_logo} className='logo' alt='logo' />
					<div className='banner-footer' />
				</div>
				<Footer classname='footer' />
			</div>
		</React.Fragment>
	);
};

export default Home;
