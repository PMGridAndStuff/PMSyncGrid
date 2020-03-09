import React from 'react';
import ReactToolTip from 'react-tooltip';

import SyncHexagon from './singleHexagon.js';


//Image related
import center from './assets/center.png';
import * as images from './imageHelpers.js';

//Helpers
import * as hexHelper from './hexagons.js';


const addingNewGridDebug = false;

//A unique image that is in the middle of all grids
function CenterHexagon(props){
  return (
    <div className='singleGrid'
        style={
          {transform: `translate(${600}px, ${600}px)`}
        }>
      <img src={addingNewGridDebug ? null : center} alt={props.hexCoords.q + ' , ' + props.hexCoords.r}/>
    </div>
    )
}

class HexagonGrids extends React.Component {
  constructor(props){
    super(props);

    const createHexagons = this.generateHexagon(props.gridInfo);

    this.state = {
      hexagonList : createHexagons,
    };

  }

  //Creates a single hexagon tile and returns it
  renderHexagon(gridNumber, info, syncLevel, layout, q, r, colour=null, iconType=null){
    if ((colour && iconType) || addingNewGridDebug) {
      //Change key to update if reset button is clicked
      const update = this.props.hexagonsClicked.includes(gridNumber) ? "yes" : '';
      return (
        // <div key={'div' + q.toString() + r.toString() + update}>
        <SyncHexagon
          key = {[q,r] + update}
          info = {info}
          syncLevel = {syncLevel}
          gridNumber = {gridNumber}
          layout = {layout}
          hexCoords = {hexHelper.Hex(q,r,-q-r)}

          bgSelectedImage = {images.baseGrids[colour][0]}
          bgGreyImage = {images.baseGrids[colour][1]}

          //If adding grids, show coords of the ones that are NOT set
          boostIcon = {iconType ? images.icons[iconType][0] : null}
          boostIconGrey = {iconType ? images.icons[iconType][1] : null}
          onClick = {() => this.props.singleGridClicked(gridNumber)}
          //onHover={(i) => this.handleMouseHover(i)}
          isSelected = {this.props.hexagonsClicked.includes(gridNumber)}
        />
        // </div>
      )
    } else {
      return (
        <CenterHexagon key={'center'} hexCoords={hexHelper.Hex(q,r,-q-r)}/>
      )
    }
  }

  /* Generates the entire hexagonal grid (sync grid) as defined by the gridInfo json objects.
  */
  generateHexagon(gridInfo){
    const orientation = hexHelper.layout_flat;
    //Default size
    const size = hexHelper.Point(69,69);
    const origin = hexHelper.Point(0,0);

    const layout = hexHelper.Layout(orientation, size, origin);


    let hexagonList = [];

    if (addingNewGridDebug) {
      for (let i = -7; i < 7; i++){
        for (let j = -7; j < 7; j++){
          hexagonList.push([-1, -1, -1, layout, i, j, "blue", null]);
        }
      }
    } else {
      hexagonList.push([-1,-1, -1, layout, 0, 0]);
    }

    for (let elementNum in gridInfo){
      const allKeys = Object.keys(gridInfo[elementNum]);
      const singleGrid = gridInfo[elementNum][allKeys];


      //info stores the description string that appears when hovering over a hexagon
      let info;
      const energyCost = singleGrid.energyCost > 0 ? "<br/> Energy Cost: " + singleGrid.energyCost : "<br/>"

      //Check if it's a regular stat up or something else
      if ((singleGrid.effectName + " " + singleGrid.effectValue.toString()) === 
          singleGrid.effectDescription){

        info = singleGrid.effectDescription + energyCost;

      } else {
        const syncGridLevel = singleGrid.syncLevel > 1 ? " (Sync Level: " + singleGrid.syncLevel + ")" : "";
        info = singleGrid.effectName + " " + singleGrid.effectValue.toString() + syncGridLevel +
         "<br/>" + singleGrid.effectDescription + energyCost;// + syncGridLevel;
      }

        const syncLevel = singleGrid.syncLevel;
        const q = singleGrid.coords[0];
        const r = singleGrid.coords[1];
        const colour = singleGrid.colour;
        const iconType = singleGrid.iconType;

        hexagonList.push([parseInt(elementNum), info, syncLevel,
          layout, q, r, colour, iconType]);
    }
    return hexagonList;
  }

  render() {
    const allHexagons = this.state.hexagonList.map(singleHexagon => {
      return this.renderHexagon(...singleHexagon);
    });
    return (
      <div id="syncGrid" className="syncGrid">
        <div className="grids">
          {allHexagons}
        </div>

        <ReactToolTip place="top" type="dark" effect="float" multiline={true}/>

      </div>
    );
  }
}

export default HexagonGrids;