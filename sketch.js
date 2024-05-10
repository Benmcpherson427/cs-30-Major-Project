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

class move {
  constructor(type, damage, hitType) {
    this.type = type;
    this.damage = damage;
    this.hitType = hitType;
  }

  
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
  let charizard = new pokemon(78, 84, 78, 109, 85, 100, "fire", "flying");
  let pikachu = new pokemon(45, 80, 50, 75, 60, 120, "electric", "none");
}

function draw() {
  background(255);
  image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  loadPokemon();
  optionsBox();
}

function optionsBox() {
  fill("red");
  rect(windowWidth*3/4, windowHeight*(3/4), windowWidth, windowHeight);

}

function mousePressed() {
  if (mouseX >= windowWidth*3/4 && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight) {
    fill(200);
    rect(windowWidth/2, windowHeight*(3/4), windowWidth, windowHeight);
  }
}

function loadPokemon() {
  imageMode(CENTER);
  image(pikachuIMG, windowWidth*(5.3/7), windowHeight/2, pikachuIMG.width*4, pikachuIMG.height*4);
  image(charizardIMG, windowWidth/4.5, windowHeight - charizardIMG.height*2.2, charizardIMG.width *5, charizardIMG.height*5);
}

function dealDamage() {
  
}


