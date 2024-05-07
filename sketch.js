// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let yourX = width/4;
let yourY = height * (3/4);
let diameter = 100;
let charizardIMG;
let pikachuIMG;

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

function preload() {
  pikachuIMG = loadImage("pikachufront.png");
  charizardIMG = loadImage("charizardback.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  charizard = new pokemon(78, 84, 78, 109, 85, 100, "fire", "flying");
}

function draw() {
  background(220);
  displayBattleGrid();

}


function displayBattleGrid() {
  optionsBox();
  battleSpots();
}

function optionsBox() {
  fill(0);
  rect(0, height * 0.8, width, height);
}
 
function battleSpots() {
  fill("green");
  circle(yourX, yourY, diameter);
}
