// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let diameter = 100;
let charizardBIMG;
let pikachuBIMG;
let garchompBIMG;
let lucarioBIMG;
let charizardFIMG;
let pikachuFIMG;
let garchompFIMG;
let lucarioFIMG;
let bg;
let startScreen;
let pikachu;
let charizard;
let garchomp;
let lucario;
let pokemons = [];
let pokemon1;
let pokemon2;
let target;
let crit;
let STAB;
let sE;
let nVE;
let damage;
let moveType;
let state;

function preload() {
  pikachuFIMG = loadImage("front sprites/pikachufront.png");
  pikachuBIMG = loadImage("back sprites/pikachuback.png");
  charizardFIMG = loadImage("front sprites/charizardfront.png");
  charizardBIMG = loadImage("back sprites/charizardback.png");
  garchompFIMG = loadImage("front sprites/garchompfront.png");
  garchompBIMG = loadImage("back sprites/garchompback.png");
  lucarioFIMG = loadImage("front sprites/lucariofront.png");
  lucarioBIMG = loadImage("back sprites/lucarioback.png");
  bg = loadImage("other displays/pokemonbackground.png");
  startScreen = loadImage("other displays/start screen.png");
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
  pikachu = new pokemon(75, 80, 70, 95, 60, 120, "electric", "none");
  garchomp = new pokemon(108, 130, 95, 80, 85, 102, "dragon", "ground");
  lucario = new pokemon(70, 110, 70, 115, 70, 90, "fighting", "steel");
  pokemons.push(lucario);
  pokemons.push(pikachu);
  pokemons.push(garchomp);
  pokemons.push(charizard);
  pokemon1 = random(pokemons);
  for (let pokeman of pokemons) {
    if (pokeman === pokemon1) {
      let theIndex = pokemons.indexOf(pokeman);
      pokemons.splice(theIndex, 1);
    }
  }
  pokemon2 = random(pokemons);
  state = "opening";
}

function draw() {
  if (state === "opening") {
    image(startScreen, 0, 0, windowWidth, windowHeight);
    if (key === " ") {
      state = "battle";
    }
  }
  if (state === "battle") {
    image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    loadPokemon();
    healthbox();
    kill();
    optionsBox();
  }
  if (state === "moves") {
    image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    loadPokemon();
    healthbox();
    kill();
    moveset();
  }
}

// temporary function for damage
function keyPressed() {

  if (key === "d") {
    pokemon1.HP -= round(10 * random(0.85, 1));
  }
  if (key === "a") {
    pokemon2.HP -= round(15 * random(0.85, 1));
  }
}

function optionsBox() {
  fill("red");
  rect(windowWidth*5/8, windowHeight*(3/4), windowWidth, windowHeight);
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text("BATTLE", windowWidth*(13/16), windowHeight*(7/8));
}

function moveset() {
  fill("red");
  rect(windowWidth*(5/8), windowHeight*(3/4), windowWidth*(13/16), windowHeight*(7/8));
  fill("blue");
  rect(windowWidth*(13/16), windowHeight*(3/4), windowWidth, windowHeight*(7/8));
  fill("yellow");
  rect(windowWidth*(5/8), windowHeight*(7/8), windowWidth*(13/16), windowHeight*(3/4));
  fill("green");
  rect(windowWidth*(13/16), windowHeight*(7/8), windowWidth*(13/16), windowHeight*(3/4));

}

function healthbox() {
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(pokemon2.HP, windowWidth*(7/8), windowHeight/8);

  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(pokemon1.HP, windowWidth/8, windowHeight/8);
}

function mousePressed() {
  console.log(mouseX, mouseY);
  if (mouseX >= windowWidth*(5/8) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight) {
    state = "moves";
  }
}

function loadPokemon() {
  imageMode(CENTER);
  if (pokemon1 === lucario) {
    image(lucarioBIMG, windowWidth/4.5, windowHeight - lucarioBIMG.height*2, lucarioBIMG.width *5, lucarioBIMG.height*5);
  }
  else if (pokemon1 === pikachu) {
    image(pikachuBIMG, windowWidth/4.5, windowHeight - pikachuBIMG.height*1.5, pikachuBIMG.width *5, pikachuBIMG.height*5);
  }
  else if (pokemon1 === charizard) {
    image(charizardBIMG, windowWidth/4.5, windowHeight - charizardBIMG.height*2.2, charizardBIMG.width *5, charizardBIMG.height*5);
  }
  else if (pokemon1 === garchomp) {
    image(garchompBIMG, windowWidth/4, windowHeight - garchompBIMG.height*2, garchompBIMG.width*5, garchompBIMG.height*5);
  }


  if (pokemon2 === lucario) {
    image(lucarioFIMG, windowWidth*(5.3/7), windowHeight/2.4, lucarioFIMG.width*5, lucarioFIMG.height*5);
  }
  else if (pokemon2 === pikachu) {
    image(pikachuFIMG, windowWidth*(5.3/7), windowHeight/2, pikachuFIMG.width*5, pikachuFIMG.height*5);
  }
  else if (pokemon2 === charizard) {
    image(charizardFIMG, windowWidth*(5.3/7), windowHeight/2.2, charizardFIMG.width*4, charizardFIMG.height*4);
  }
  else if (pokemon2 === garchomp) {
    image(garchompFIMG, windowWidth*(5.3/7), windowHeight/2.5, garchompFIMG.width*5, garchompFIMG.height*5);
  }
}


function kill() {
  if (pokemon1.HP <= 0) {
    pokemon1.HP = 0;
    fill(220);
    rect(windowWidth/4, windowHeight/4, windowWidth/2, windowHeight/2);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Computer wins", windowWidth/2, windowHeight/2);
  }
  if (pokemon2.HP <= 0) {
    pokemon2.HP = 0;

    
  
    fill(220);
    rect(windowWidth/4, windowHeight/4, windowWidth/2, windowHeight/2);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Player wins", windowWidth/2, windowHeight/2);

  }
}

// function typeChart() {
//   if (target === garchomp) {
//     if (moveType === "fairy" || moveType === "dragon") {
//       damage = damage *2;
//     }
//     else if (moveType === "ice") {
//       damage = damage *4;
//     }
//     else if (moveType === "poison" || moveType === "rock" || moveType === "fire") {
//       damage = damage *0.5;
//     }
//     else if (moveType === "electric") {
//       damage = 0;
//     }
//     else {
//       damage;
//     }
//   }

//   if (target === pikachu) {
//     if (moveType === "ground") {
//       damage = damage *2;
//     }
//     else if (moveType === "electric" || moveType === "steel" || moveType === "flying") {
//       damage = damage *0.5;
//     }
//     else {
//       damage;
//     }
//   }

//   if (target === charizard) {
//     if (moveType === "water" || moveType === "electric") {
//       damage = damage *2;
//     }
//     else if (moveType === "rock") {
//       damage = damage *4;
//     }
//     else if (moveType === "poison" || moveType === "rock" || moveType === "fire") {
//       damage = damage *0.5;
//     }
//     else if (moveType === "ground") {
//       damage = 0;
//     }
//     else {
//       damage;
//     }
//   }
// }
