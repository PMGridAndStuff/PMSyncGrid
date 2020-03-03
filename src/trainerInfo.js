
import sygnaSuitRedGridInfo from './gridInfo/Sygna_Suit_Red__Charizard.txt.json';
import redPicture from './assets/trainers/red/ch0000_00_red_256.ktx.png';
import charizardPicture from './assets/trainers/red/pm0006_00_lizardon_256.ktx.png';

import grimsleyGridInfo from './gridInfo/Grimsley__Liepard.txt.json';
import grimsleyPicture from './assets/trainers/grimsley/ch0048_00_gima_256.ktx.png';
import liepardPicture from './assets/trainers/grimsley/pm0510_00_lepardas_256.ktx.png';

import karenGridInfo from'./gridInfo/Karen__Houndoom.txt.json'
import karenPicture from './assets/trainers/karen/ch0062_00_karin_256.ktx.png'
import houndoomPicture from './assets/trainers/karen/pm0229_01_hellgar_256.ktx.png'

export const red = ["red", "charizard", redPicture, charizardPicture, sygnaSuitRedGridInfo];
export const grimsley = ["grimsley", "liepard", grimsleyPicture, liepardPicture, grimsleyGridInfo];
export const karen = ["karen", "houndoom", karenPicture, houndoomPicture, karenGridInfo];

export const trainerInfo = [
    grimsley,
    karen,
    red,

];