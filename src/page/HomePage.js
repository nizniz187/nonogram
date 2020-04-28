import React from "react";
import {Link} from "react-router-dom";
class HomePage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <>
			<h3>Nonogram HomePage</h3>
			<div><Link to="/game">Start Game</Link></div>
		</>;
	}
};
export default HomePage;