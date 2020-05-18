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
        <Route path={['/game/:level']} component={GamePage} />
				<Route path="/" component={HomePage} />
			</Switch>
		</Router>;
	}
}
ReactDOM.render(<App/>, document.querySelector('#root'));