// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let diameter = 100;
let charizardBIMG;
let pikachuFIMG;
let bg;
let pikachu;
let charizard;
let crit;
let STAB;
let sE;
let nVE;

function preload() {
  pikachuFIMG = loadImage("front sprites/pikachufront.png");
  charizardBIMG = loadImage("back sprites/charizardback.png");
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
  charizard = new pokemon(78, 84, 78, 109, 85, 100, "fire", "flying");
  pikachu = new pokemon(45, 80, 50, 75, 60, 120, "electric", "none");
}

function draw() {
  background(255);
  image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  loadPokemon();
  healthbox();
  kill();
  // optionsBox();
  
}

// temporary function for damage
function keyPressed() {

  // crit = random(100);
  // if (crit < 5) {
  //   crit = 2;
  // }
  // else {
  //   crit = 1;
  // }

  // // Checks to see if move is super effective on opposing pokemon
  // if (sE === true) {
  //   sE = 1.5;
  // }
  // else {
  //   sE = 1;
  // }
  // // Checks to see if move is not every effective on opposing pokemon
  // if (nVE === true) {
  //   nVE = 0.5;
  // }
  // else {
  //   nVE = 1;
  // }

  // // Checks for if move is same type as pokemon using move
  // if (STAB === true) {
  //   STAB = 1.5;
  // }
  // else {
  //   STAB = 1;
  // }


  // ((((100/5) + 2)*this.damage*(charizard.ATK/pikachu.DEF)/50)+2)*random(0.85, 1)*STAB*sE*nVE;

  if (key === "d") {
    pikachu.HP -= round(10 * random(0.85, 1));
  }
  if (key === "a") {
    charizard.HP -= round(15 * random(0.85, 1));
  }
}

// function optionsBox() {
//   fill("red");
//   rect(windowWidth*3/4, windowHeight*(3/4), windowWidth, windowHeight);
//   fill("black");
//   textSize(60);
//   textAlign(CENTER, CENTER);
//   text("BATTLE", windowWidth*(7/8), windowHeight*(7/8));
// }

function healthbox() {
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(pikachu.HP, windowWidth*(7/8), windowHeight/8);

  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(charizard.HP, windowWidth/8, windowHeight/8);
}

// function mousePressed() {
//   console.log(mouseX, mouseY);
//   if (mouseX >= 1200 && mouseX <= 1600 && mouseY >= 570 && mouseY <= 765) {
//     fill(200);
//     rect(windowWidth*3/4, windowHeight*(3/4), windowWidth, windowHeight);
//   }
// }

function loadPokemon() {
  imageMode(CENTER);
  image(pikachuIMG, windowWidth*(5.3/7), windowHeight/2, pikachuIMG.width*4, pikachuIMG.height*4);
  image(charizardIMG, windowWidth/4.5, windowHeight - charizardIMG.height*2.2, charizardIMG.width *5, charizardIMG.height*5);
}

function dealDamage() {
  
}

function kill() {
  if (pikachu.HP <= 0) {
    pikachu.HP = 0;
  }
  if (charizard.HP <= 0) {
    charizard.HP = 0;
  }
}
