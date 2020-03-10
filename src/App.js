import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {reveal as Menu} from 'react-burger-menu';
import Sidebar from "react-sidebar";

import './App.css';
import './Menu.css';

import HexagonGrids from './hexagonGrids.js';
import GridEffectSidebar from './gridEffectSidebar.js';

import * as trainerInfo from './trainerInfo.js';

//import clearBorder from './assets/clear_border.png';
//import lockImage from './assets/lock_grey.png';
//import borderImage from'./assets/backgrounds/borderLineSmall.png';

const NUM_OF_GRIDS = 48;
const QUERY_STRING_NAME = 'grid=';
//Default trainer to show
let currentTrainer = 'karen';

function hex2bin(hex){
    return (parseInt(hex, 16).toString(2));
}

function bin2hex(bin){
  return parseInt(bin, 2).toString(16);
}

//Single item in the grid choosing menu
function MenuItem(props) {
  return (
    <div id="trainers" className="menu-item" onClick={() => props.onClick()}>
        {props.trainer + " & " + props.pokemon}
        <br/>
        <img src={props.trainerPicture} alt=''/>
        <img src={props.pokemonPicture} alt=''/>
    </div>
  );
}

//Width at which the sidebar will remain docked
const mql = window.matchMedia(`(min-width: 1337px)`);
const disableSidebarButton = window.matchMedia(`(max-width: 440px)`);

class PMSyncGridViewer extends React.Component {
  constructor(props){
    super(props);

    let hexagonsClicked = [];

    const trainerParam = this.props.match.params.gridName;

    if (trainerParam in trainerInfo){
      currentTrainer = trainerParam;

      if (props.location.search.includes(QUERY_STRING_NAME)){
        //Read the query string value
        let gridHex = props.location.search.slice(QUERY_STRING_NAME.length + 1);

        //Converts hex values back into 
        gridHex = hex2bin(gridHex).padStart(NUM_OF_GRIDS, '0').split('');

        //Read through array where value = 0 : not clicked and 1 = clicked
        gridHex.forEach(function(value, index){
          if (parseInt(value) === 1) {
            hexagonsClicked.push(index);
          }
        });
      }
    } else {
      //No param was given so just add default trainer to url
      props.history.push('/' + currentTrainer + '/');
    }
   
    this.state = {
      activeGrid: currentTrainer,
      hexagonsClicked: hexagonsClicked,

      //Control UI elements
      menuOpen: false,
      disableMenuTransition: true,

      sidebarOpen: mql.matches,
      sidebarDocked: mql.matches,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    mql.addListener(this.mediaQueryChanged);
    disableSidebarButton.addListener(this.mediaQueryChanged);
  }

  //Lift state from each syncHexagon so we can update sidebar
  handleSingleGridClick(hex){

    const hexagonsClicked = this.state.hexagonsClicked.slice();
    if (hexagonsClicked.includes(hex)){
      hexagonsClicked.splice(hexagonsClicked.indexOf(hex), 1)
      this.setState({
        hexagonsClicked : hexagonsClicked,
      });
    } else {
      hexagonsClicked.push(hex);
      this.setState({
        hexagonsClicked : hexagonsClicked,
      });
    }

    //Convert clicked to hex and change the URL
    let hexagonsToZeroArray = new Array(NUM_OF_GRIDS).fill(0);
    //Create array in form (if 2, 4 were clicked):
    //[0,0,1,0,1,0,0......,0]
    hexagonsClicked.forEach(function(gridNumber, index){
      hexagonsToZeroArray[gridNumber] = 1;
    });

    //Convert to hexadecimal
    const hexagonsToHex = bin2hex(hexagonsToZeroArray.join(''));

    //Update url with current trainer and grid
    this.props.history.push({
        search: QUERY_STRING_NAME + hexagonsToHex.padStart(NUM_OF_GRIDS/4, '0')
      });

  }

  /* Controls side bar methods: */
  onSetSidebarOpen(open) {
    this.setState({ 
      sidebarOpen: open,
      sidebarDocked: open,
    });
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged(){
    this.setState({
      sidebarDocked: mql.matches, 
      sidebarOpen: false,
    });
  }

  /*Controlling menu methods:*/


  isMenuOpen(state) {
    this.setState({
      menuOpen: state.isOpen,
      disableMenuTransition: !this.state.disableMenuTransition,
    });
  };
  //Called after an object on the menu HAS BEEN CLICKED => Change visible grid
  handleMenuItemClick(name){
    if (name !== this.state.activeGrid) {
      this.setState({
        activeGrid: name,
        //Close the menu after changing the grid
        menuOpen: false,
        disableMenuTransition: true,
        hexagonsClicked: [],
      });

      //Update url with new activeGrid
      this.props.history.push({
        pathname: '/' + name,
      });
    }
  }

  //Creates the left menu allowing user to pick between grids
  renderTrainerMenu() {
    const trainersMenu = trainerInfo.trainerInfo.map((singleTrainer, index) => {
      //Custom name for sygna suits
      const displayName = singleTrainer[0].includes("sygna") ? 
        "S.S. " + singleTrainer[0].slice(9) : singleTrainer[0];
      return (
        <MenuItem key={"burgermenuitem" + singleTrainer[0]}
          trainer = {displayName}
          pokemon = {singleTrainer[1]}
          trainerPicture = {singleTrainer[2]}
          pokemonPicture = {singleTrainer[3]}
          onClick = {(name) => this.handleMenuItemClick(singleTrainer[0])}
        />
      );
    });
    return trainersMenu;
  }

  resetClickedHexagons(){
    this.setState({
      hexagonsClicked: [],
    });
  }


  render() {
    //These are temporary buttons
    const hideSidebarButton =  mql.matches ? null : 
        <button onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}
        style={{float: "left", position: "absolute", left: "0%", top:"100px",
         backgroundColor:"#c8e4f4", border: "none", padding:"16px", margin: 10}}
         disabled={disableSidebarButton.matches ? true : false}>
          Toggle info
        </button>

    const resetButton = <button onClick={() => this.resetClickedHexagons()}
        style={{float: "left", position: "absolute", left: "0%", top:"150px",
         backgroundColor:"#c8e4f4", border: "none", padding:"16px", margin: 10}}>
          Reset Grid
        </button>
    /*

        <button onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}
        style={{float: "right", position: "absolute", right: "25%", top:0}}>
          Open sidebar
        </button>


    */

    const gridTexts = <GridEffectSidebar
                        hexagonsClicked= {this.state.hexagonsClicked}
                        activeGrid= {this.state.activeGrid}
                      />
    const trainerMenuItems = this.renderTrainerMenu()
    return (

      <div id="menuWrapper" className="menuWrapper" >
          <Sidebar
            sidebar={gridTexts}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{root: {bottom: 17}}}
            pullRight={true}
            touch={true}
            docked={this.state.sidebarDocked}
          >          
            <p>  </p>
           </Sidebar>

        <div className="currentTrainer">
          <img src={trainerInfo[this.state.activeGrid][2]} alt=''/>
        </div>
        <div className="currentPokemon">
          <img src={trainerInfo[this.state.activeGrid][3]} alt=''/>
        </div>

        <Menu key={this.state.activeGrid + "burgermenu"} //This fixes second "flash" rerender of menu when object is clicked
          pageWrapId={"syncGrid"} 
          outerContainerId={"menuWrapper"} width={345}
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.isMenuOpen(state)}
          noTransition={this.state.disableMenuTransition}>
          {trainerMenuItems}
        </Menu>
        <HexagonGrids
          key = {this.state.activeGrid}
          gridInfo = {trainerInfo[this.state.activeGrid][4]}
          singleGridClicked = {(hex) => this.handleSingleGridClick(hex)}
          hexagonsClicked = {this.state.hexagonsClicked}
        >
       </HexagonGrids>

       {hideSidebarButton}
       {resetButton}

      </div>

    );
  }
}

function App() {
  //let obj = JSON.parse(sygnaSuitRedCharizard);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Route path="/:gridName?" component={PMSyncGridViewer} />
    </Router>
   );
}

export default App;
