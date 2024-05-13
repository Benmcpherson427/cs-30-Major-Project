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
let pikachu;
let charizard;

function preload() {
  pikachuIMG = loadImage("front sprites/pikachufront.png");
  charizardIMG = loadImage("back sprites/charizardback.png");
  bg = loadImage("other displays/pokemonbackground.png");
}

class move {
  constructor(movedUsed, type, damage, hitType) {
    this.movedUsed = movedUsed;
    this.type = type;
    this.damage = damage;
    this.hitType = hitType;
  }
}

class pokemon {
  constructor(HP, ATK, DEF, SPA, SPD, SPE, type1, type2, level) {
    this.HP = HP;
    this.ATK = ATK;
    this.DEF = DEF;
    this.SPA = SPA;
    this.SPD = SPD;
    this.SPE = SPE;
    this.type1 = type1;
    this.type2 = type2;
    this.level = 50;
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
  // optionsBox();
  
}

function keyPressed() {
  crit = random(2);
  STAB = true
  if (key === "d") {
    pikachu.HP -= ((((100/5) + 2)*this.damage*(charizard.ATK/pikachu.DEF)/50)+2)*
  }
  if (key === "a") {
    charizard.HP -= 15;
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
