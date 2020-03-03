/*
TODO: Separate imports for each grid into its own file
so not everything gets imported all the time.
*/

//Grid images
import blueBackground from './assets/blue_background.png' 
import blueSelected from './assets/blue_selected.png' 
import greenBackground from './assets/green_background.png' 
import greenSelected from './assets/green_selected.png' 
import redBackground from './assets/red_background.png' 
import redSelected from './assets/red_selected.png' 
import yellowBackground from './assets/yellow_background.png' 
import yellowSelected from './assets/yellow_selected.png' 
import syncBackground from './assets/sync_background.png' 
import syncSelected from './assets/sync_selected.png'

//Icons on top
import bugSelected from './assets/bug_selected.png' 
import bugGrey from './assets/bug_grey.png' 
import darkSelected from './assets/dark_selected.png' 
import darkGrey from './assets/dark_grey.png' 
import dragonSelected from './assets/dragon_selected.png' 
import dragonGrey from './assets/dragon_grey.png' 
import electricSelected from './assets/electric_selected.png' 
import electricGrey from './assets/electric_grey.png' 
import fairySelected from './assets/fairy_selected.png' 
import fairyGrey from './assets/fairy_grey.png' 
import fightingSelected from './assets/fighting_selected.png' 
import fightingGrey from './assets/fighting_grey.png' 
import fireSelected from './assets/fire_selected.png' 
import fireGrey from './assets/fire_grey.png' 
import flyingSelected from './assets/flying_selected.png' 
import flyingGrey from './assets/flying_grey.png' 
import ghostSelected from './assets/ghost_selected.png' 
import ghostGrey from './assets/ghost_grey.png' 
import grassSelected from './assets/grass_selected.png' 
import grassGrey from './assets/grass_grey.png' 
import groundSelected from './assets/ground_selected.png' 
import groundGrey from './assets/ground_grey.png' 
import iceSelected from './assets/ice_selected.png' 
import iceGrey from './assets/ice_grey.png' 
import moveSelected from './assets/move_selected.png' 
import moveGrey from './assets/move_grey.png' 
import psychicSelected from './assets/psychic_selected.png' 
import psychicGrey from './assets/psychic_grey.png' 
import rockSelected from './assets/rock_selected.png' 
import rockGrey from './assets/rock_grey.png' 
import shadowSelected from './assets/shadow_selected.png' 
import shadowGrey from './assets/shadow_grey.png' 
import statSelected from './assets/stat_selected.png' 
import statGrey from './assets/stat_grey.png' 
import syncmoveSelected from './assets/syncmove_selected.png' 
import syncmoveGrey from './assets/syncmove_grey.png' 
import trainerSelected from './assets/trainer_selected.png' 
import trainerGrey from './assets/trainer_grey.png' 
import uniqueSelected from './assets/unique_selected.png' 
import uniqueGrey from './assets/unique_grey.png' 
import waterSelected from './assets/water_selected.png' 
import waterGrey from './assets/water_grey.png'

export const baseGrids = {'blue' : [blueSelected, blueBackground],
 'green': [greenSelected, greenBackground], 
 'red': [redSelected, redBackground],
 'yellow': [yellowSelected, yellowBackground],
 'sync': [syncSelected, syncBackground],
};

export const icons = {'bug' : [bugSelected, bugGrey], 
 'dark' : [darkSelected, darkGrey], 
 'dragon' : [dragonSelected, dragonGrey], 
 'electric' : [electricSelected, electricGrey], 
 'fairy' : [fairySelected, fairyGrey], 
 'fighting' : [fightingSelected, fightingGrey], 
 'fire' : [fireSelected, fireGrey], 
 'flying' : [flyingSelected, flyingGrey], 
 'ghost' : [ghostSelected, ghostGrey], 
 'grass' : [grassSelected, grassGrey], 
 'ground' : [groundSelected, groundGrey], 
 'ice' : [iceSelected, iceGrey], 
 'move' : [moveSelected, moveGrey], 
 'psychic' : [psychicSelected, psychicGrey], 
 'rock' : [rockSelected, rockGrey], 
 'shadow' : [shadowSelected, shadowGrey], 
 'stat' : [statSelected, statGrey], 
 'syncmove' : [syncmoveSelected, syncmoveGrey], 
 'trainer' : [trainerSelected, trainerGrey], 
 'unique' : [uniqueSelected, uniqueGrey], 
 'water' : [waterSelected, waterGrey],
};

//Generated imports with the following code:

// const backgroudFileName = '_background.png';
// const bgName = 'Background';
// const selectedFileName = '_selected.png';
// const selectedName = 'Selected';
// const greyFileName = '_grey.png';
// const greyName = 'Grey';


// const gridBases = colours.map(colourName => {
//   console.log("import " + colourName + bgName + " from './assets/" + colourName + backgroudFileName + "'")
//   console.log("import " + colourName + selectedName + " from './assets/" + colourName + selectedFileName + "'")

// });

  //Icons 
// const iconTypes = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 
// 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'move', 'psychic', 'rock', 
// 'shadow', 'stat', 'syncmove', 'trainer', 'two_circles', 'unique', 'water'];

// const icons = iconTypes.map(name => {
//   console.log("import " + name + selectedName + " from './assets/" + name + selectedFileName + "'")
//   console.log("import " + name + greyName + " from './assets/" + name + greyFileName + "'")

// });
