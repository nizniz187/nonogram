import React from "react";
import {Link} from "react-router-dom";
import Nonogram from "../nonogram/Nonogram.js";
class GamePage extends React.Component{
	constructor(props){
    super(props);
	}
	render(){
		return <div>
			<div><Link to="/">&lt; Back</Link></div>
			<Nonogram colLength={this.level.colLength} rowLength={this.level.rowLength} />
		</div>;
  }
  
  /** Get level settings by parameter. */
  get level() {
    try {
      switch(this.props.match.params.level.toUpperCase()) {
        case 'HARD':
          return GAME_LEVEL_HARD;
        case 'MEDIUM':
          return GAME_LEVEL_MEDIUM;
        case 'EASY':
        default:
          return GAME_LEVEL_EASY;
      }
    } catch(e) {
      return GAME_LEVEL_EASY;
    }
  }
};

const GAME_LEVEL_EASY = { colLength: 5, rowLength: 5 };
const GAME_LEVEL_MEDIUM = { colLength: 10, rowLength: 10 };
const GAME_LEVEL_HARD = { colLength: 15, rowLength: 15 };
export default GamePage;