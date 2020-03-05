import React from 'react';
import * as images from './imageHelpers.js';
import * as trainerInfo from './trainerInfo.js';

//Read through the effects that have the same icon.
function SingleEffectSidebar(props){
    const icon = props.iconType;
    const gridText = props.text;

    let aggregatedText = [];
    Object.keys(gridText).forEach(function(key){
      aggregatedText.push(
        <div className="sidebarElement" key={"sidebarElement" + key}>
          <img src={images.icons[icon][0]} alt="None"/>
          <div className="sidebarText">
            {key + " " + gridText[key]}
          </div>
        </div>

      );
    });

    return aggregatedText;
}

class GridEffectSidebar extends React.Component {
  
  //Do damage calculation, limited energy cost etc from gridEffects
  aggregateEffects(){

    //gridEffects format: {iconType : {effectName, effectValue}}
    let gridEffects = {};
    let totalEnergy = 0;

    const hexagonInfo = trainerInfo[this.props.activeGrid][4];

    this.props.hexagonsClicked.forEach(function(step){

      //To read the info correctly from the keys of the json file containing the information
      //Structure of gridEffects: {iconType : {effectName : effectValue}}
      const gridName = "grid" + (parseInt(step)+1).toString();
      const currentHexagon = hexagonInfo[step][gridName]

      const iconType = currentHexagon['iconType'];
      const effectName = currentHexagon['effectName'];
      const effectValue = currentHexagon['effectValue'];
      totalEnergy += currentHexagon.energyCost;

      // Aggregate all the effects of similar effect tiles that are clicked
      if (iconType in gridEffects) {
        if (effectName in gridEffects[iconType]){
          gridEffects[iconType][effectName] = gridEffects[iconType][effectName] + effectValue;
        } else {
          gridEffects[iconType][effectName] = effectValue;
        }
      } else {
        gridEffects[iconType] = {};
        gridEffects[iconType][effectName] = effectValue;
      }
    });

    //Create the text that is shown on the right information bar
    let gridTexts = [];
      //Show energy usage
    const energyText = totalEnergy < 60 ? 
      <div key={"sidebarTextEnergy"} style={{margin: 20}}>{"Energy Cost: " + totalEnergy}</div> :
      <div key={"sidebarTextEnergy"} style={{margin: 20, color: 'red'}}><b>{"Energy Cost: " + totalEnergy}</b></div>;

    gridTexts.push(energyText);

      //After finishing aggregating similar effects
      //Each gridEffect[key] has the same icon i.e. should be grouped together
    Object.keys(gridEffects).forEach(function(key, index){

      gridTexts.push(
        <div className='sidebarGroup' key={'sidebarGroup' + key}>
          <SingleEffectSidebar
            key={'sidebarText' + index}
            text={gridEffects[key]}
            iconType={key}
          />
        </div>
      );
    });
    return gridTexts
  }

  render() {
    const aggregatedText = this.aggregateEffects();

    return (
      <div>
        {aggregatedText}
        <div className="borderImage"
        //To do: Add borderImage to section off different sets of bonuses (Stats/Special/Move)
        >
        </div>
      </div>
    );
  }

}

export default GridEffectSidebar;