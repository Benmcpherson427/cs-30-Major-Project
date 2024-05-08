// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let diameter = 100;
let charizardIMG;
let pikachuIMG;
let bg;

function preload() {
  pikachuIMG = loadImage("front sprites/pikachufront.png");
  charizardIMG = loadImage("back sprites/charizardback.png");
  bg = loadImage("other displays/pokemonbackground.png");
}

class pokemon {
  constructor(HP, ATK, DEF, SPA, SPD, SPE, type1, type2) {
    this.HP = HP;
    this.ATK = ATK;
    this.DEF = DEF;
    this.SPA = SPA;
    this.SPD = SPD;
    this.SPE = SPE;
    this.type1 = type1;
    this.type2 = type2;
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  // charizard = new pokemon(78, 84, 78, 109, 85, 100, "fire", "flying");
}

function draw() {
  background(255);
  // image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  displayBattleGrid();
  loadPokemon();
}


function displayBattleGrid() {
  optionsBox();
}

function optionsBox() {
  fill(0);
  rect(0, windowHeight * 0.8, windowWidth, windowHeight);
}


function loadPokemon() {
  image(pikachuIMG, windowWidth*(4/7), windowHeight/8, pikachuIMG.width*4, pikachuIMG.height*4);
  image(charizardIMG, windowWidth/7, windowHeight/4, charizardIMG.width *4, charizardIMG.height*4);
}