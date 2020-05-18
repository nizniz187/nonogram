import React from "react";
import {Link} from "react-router-dom";
import './page.css';

class HomePage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
      <div className="page-container">
        <div className="logo">LOGO</div>
        <Link to="/game/easy" className="btn btn-full">EASY</Link>
        <Link to="/game/medium" className="btn btn-full mt-10">MEDIUM</Link>
        <Link to="/game/hard" className="btn btn-full mt-10">HARD</Link>
        <Link to="/tutorial" className="link link-plain mt-20">Tutorial</Link>
      </div>
    );
	}
};
export default HomePage;