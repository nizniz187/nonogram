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
				<Route exact path="/" component={HomePage} />
        <Route path={['/game/:level']} component={GamePage} />
			</Switch>
		</Router>;
	}
}
ReactDOM.render(<App/>, document.querySelector('#root'));