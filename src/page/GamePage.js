import React from "react";
import {Link} from "react-router-dom";
import Nonogram from "../nonogram/Nonogram.js";
class HomePage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <>
			<h3>Nonogram</h3>
			<div><Link to="/">Back Home</Link></div>
			<Nonogram colLength="5" rowLength="5" />
		</>;
	}
};
export default HomePage;