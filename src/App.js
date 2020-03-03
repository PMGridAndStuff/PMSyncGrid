import React from 'react';
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

//Set to true and grids will show coordinates to facilitate adding grids
const currentTrainer = 'karen';

//Single item in the grid choosing menu
function MenuItem(props) {
  return (
    <div id="trainers" className="menu-item" onClick={() => props.onClick()}>
        {props.trainer + " & " + props.pokemon}
        <img src={props.trainerPicture} alt=''/>
        <img src={props.pokemonPicture} alt=''/>
    </div>
  );
}

//Width at which the sidebar will remain docked
const mql = window.matchMedia(`(min-width: 900px)`);

class PMSyncGridViewer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      activeGrid: currentTrainer,
      hexagonsClicked: [],

      //Control UI elements
      menuOpen: false,

      sidebarOpen: mql.matches,
      sidebarDocked: mql.matches,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    mql.addListener(this.mediaQueryChanged);

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

  //Called after an object on the menu HAS BEEN CLICKED => Change visible grid
  handleMenuClick(name){
    this.setState({
      activeGrid: name,
      //Close the menu after changing the grid
      menuOpen: false,
      hexagonsClicked: [],
    });
  }

  isMenuOpen(state) {
    this.setState({menuOpen: state.isOpen});
  };

  //Creates the left menu allowing user to pick between grids
  renderTrainerMenu() {
    const trainersMenu = trainerInfo.trainerInfo.map((singleTrainer, index) => {
      return (
        <MenuItem key={"burgermenu" + singleTrainer[0]}
          trainer = {singleTrainer[0]}
          pokemon = {singleTrainer[1]}
          trainerPicture = {singleTrainer[2]}
          pokemonPicture = {singleTrainer[3]}
          onClick = {(name) => this.handleMenuClick(singleTrainer[0])}
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
         backgroundColor:"#c8e4f4", border: "none", padding:"16px", margin: 10}}>
          Open info
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
    return (

      <div id="menuWrapper" className="menuWrapper">
          <Sidebar
            sidebar={gridTexts}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{backgroundColor: '#5f705c'}}
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



        <Menu pageWrapId={"syncGrid"} outerContainerId={"menuWrapper"} width={350}
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.isMenuOpen(state)}>
          {this.renderTrainerMenu()}
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
    <PMSyncGridViewer/>
   );
}

export default App;
