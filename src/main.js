import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import HomePage from "./page/HomePage.js";
import GamePage from "./page/GamePage.js";

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <Router>
			<Switch>
				<Route path="/game">
					<GamePage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Router>;
	}
}
ReactDOM.render(<App/>, document.querySelector('#root'));