// CS-30 Major Project - Pokemon Battle simulator
// Ben McPherson
// May 1st - June 14th
//
// Unfortunately this code never worked, which is sad because this was my code that had the type interactions and proper timing built in, although Ii don't knwo if they actually worked, as the coed never got to the point where it would run those parts when I played the game.



let battleMusic;
let victoryMusic;
let charizardBIMG;
let pikachuBIMG;
let garchompBIMG;
let lucarioBIMG;
let charizardFIMG
let pikachuFIMG;
let garchompFIMG;
let lucarioFIMG;
let bg;
let startScreen;
let endScreen;
let pikachu;
let charizard;
let garchomp;
let lucario;
let pokemons = [];
let pokemon1;
let pokemon2;
let target;
let damage;
let moveType;
let moveUsed;
let playerMove;
let state;
let counter;
let name1;
let name2;


this loads my pokemon, images, sounds and gifs
function preload() {
  pikachuFIMG = loadImage("animatedFront/pikachufrontANI.gif");
  pikachuBIMG = loadImage("animatedBack/pikachubackANI.gif");
  charizardFIMG = loadImage("animatedFront/charizardfrontANI.gif");
  charizardBIMG = loadImage("animatedBack/charizardbackANI.gif");
  garchompFIMG = loadImage("animatedFront/garchompfrontANI.gif");
  garchompBIMG = loadImage("animatedBack/garchompbackANI.gif");
  lucarioFIMG = loadImage("animatedFront/lucariofrontANI.gif");
  lucarioBIMG = loadImage("animatedBack/lucariobackANI.gif");
  bg = loadImage("other displays/pokemonbackground.png");
  startScreen = loadImage("other displays/start screen.png");
  endScreen = loadImage("other displays/end screen.png");
  battleMusic = loadSound("other displays/sounds/CynthiaBattleMusic.mp3");
  victoryMusic = loadSound("other displays/sounds/Victory.mp3");
  charizard = new pokemon(78, 84, 78, 109, 85, 100, "fire", "flying");
  pikachu = new pokemon(75, 80, 70, 95, 60, 120, "electric", "none");
  garchomp = new pokemon(108, 130, 95, 80, 85, 102, "dragon", "ground");
  lucario = new pokemon(70, 110, 70, 115, 70, 90, "fighting", "steel");
}

this is the class which makes the pokemon
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


pushing the 4 pokemon into an array, then assigning one to each side, making sure they arent the same
function setup() {
  createCanvas(windowWidth, windowHeight);
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
  pokeName1();
  pokeName2();
  state = "opening";
}

// this is the overly long draw loop with an absurd amount of states
function draw() {
  if (state === "opening") {
    image(startScreen, 0, 0, windowWidth, windowHeight);
    if (key === " ") {
      battleMusic.loop();
      state = "battle";
    }
  }
  if (state === "battle") {
    image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    loadPokemon();
    healthbox();
    optionsBox();
  }
  if (state === "moves") {
    image(bg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    loadPokemon();
    healthbox();
    moveset();
    displayMoves();
  }
  if (state === "victory") {
    battleMusic.stop();
    victoryMusic.loop();
    state = "player wins";
  }
  if (state === "loss") {
    battleMusic.stop();
    state = "player loses";
  }
  if (state === "player loses") {
    image(endScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    fill(0);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Computer wins", windowWidth/2, windowHeight/2);
  }
  if (state === "player wins") {
    image(endScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    fill(0);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Player wins", windowWidth/2, windowHeight/2);
  }
  if (state === "prepAttack") {
    playerMoves();
    if (pokemon1.SPE > pokemon2.SPE) {
      state = "playerText";
    }
    else if (pokemon1.SPE < pokemon2.SPE) {
      state = "compText";
    }
  }
  if (state === "compText") {
    fill("220");
    rect(windowWidth*5/8, windowHeight*(3/4), windowWidth, windowHeight);
    fill("black");
    textSize(20);
    textAlign(CENTER, CENTER);
    text(name2 + " used " + compMove, windowWidth*(13/16), windowHeight*(7/8));
    setTimeout(state = "attack", 4000);
  }
  if (state === "playerText") {
    fill("220");
    rect(windowWidth*5/8, windowHeight*(3/4), windowWidth, windowHeight);
    fill("black");
    textSize(20);
    textAlign(CENTER, CENTER);
    text(name1 + " used " + playerMove, windowWidth*(13/16), windowHeight*(7/8));
    setTimeout(state = "attack", 4000);
  }
  if (state === "attack") {
    pokeAttacks();
  }
}


// this is supposed to be the code which the pokemon attack with
function pokeAttacks() {
  if (pokemon1.SPE > pokemon2.SPE) {
    playerAttacks();
    if (pokemon2.HP > 0) {
      setTimeout(compAttacks, 4000);
      setTimeout(state = "moves", 4000);
    }
    else {
      state = "victory";
    }
  }
  else if (pokemon1.SPE < pokemon2.SPE) {
    compAttacks();
    if (pokemon1.HP > 0) {
      setTimeout(playerAttacks, 4000);
      setTimeout(state = "moves", 4000);
    }
    else {
      state = "loss";
    }
  }
}

this displays the test for each move
function displayMoves() {
  fill("black");
  textSize(20);
  textAlign(CENTER, CENTER);
  if (pokemon1 === lucario) {
    text("Aura Sphere", windowWidth*(11.5/16), windowHeight*(13/16));
    text("Flash Cannon", windowWidth*(14.5/16), windowHeight*(13/16));
    text("Crunch", windowWidth*(11.5/16), windowHeight*(15/16));
    text("Psychic", windowWidth*(14.5/16), windowHeight*(15/16));
  }
  if (pokemon1 === garchomp) {
    text("Crunch", windowWidth*(11.5/16), windowHeight*(13/16));
    text("Dragon Claw", windowWidth*(14.5/16), windowHeight*(13/16));
    text("Earthquake", windowWidth*(11.5/16), windowHeight*(15/16));
    text("Rock Slide", windowWidth*(14.5/16), windowHeight*(15/16));
  }
  if (pokemon1 === pikachu) {
    text("Thunderbolt", windowWidth*(11.5/16), windowHeight*(13/16));
    text("Iron Tail", windowWidth*(14.5/16), windowHeight*(13/16));
    text("Play Rough", windowWidth*(11.5/16), windowHeight*(15/16));
    text("Surf", windowWidth*(14.5/16), windowHeight*(15/16));
  }
  if (pokemon1 === charizard) {
    text("Flamethrower", windowWidth*(11.5/16), windowHeight*(13/16));
    text("Dragon Pulse", windowWidth*(14.5/16), windowHeight*(13/16));
    text("Air Slash", windowWidth*(11.5/16), windowHeight*(15/16));
    text("Fire Punch", windowWidth*(14.5/16), windowHeight*(15/16));
  }
}

// this displays the red BATTLE box
function optionsBox() {
  fill("red");
  rect(windowWidth*5/8, windowHeight*(3/4), windowWidth, windowHeight);
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text("BATTLE", windowWidth*(13/16), windowHeight*(7/8));
}


// This function displays the boxes for the moves
function moveButtons() {
  rectMode(CORNERS);
  fill("red");
  rect(windowWidth*(5/8), windowHeight*(3/4), windowWidth*(13/16), windowHeight*(7/8));
  fill("blue");
  rect(windowWidth*(13/16), windowHeight*(3/4), windowWidth, windowHeight*(7/8));
  fill("yellow");
  rect(windowWidth*(5/8), windowHeight*(7/8), windowWidth*(13/16), windowHeight);
  fill("green");
  rect(windowWidth*(13/16), windowHeight*(7/8), windowWidth, windowHeight);

}

// the following functions set the names of the pokemons to strings
function pokeName1() {
  if (pokemon1 === lucario) {
    name1 = "Lucario";
  }
  else if (pokemon1 === garchomp) {
    name1 = "Garchomp";
  }
  else if (pokemon1 === charizard) {
    name1 = "Charizard";
  }
  else if (pokemon1 === pikachu) {
    name1 = "Pikachu";
  }
}

function pokeName2 () {
  if (pokemon2 === lucario) {
    name2 = "Lucario";
  }
  else if (pokemon2 === garchomp) {
    name2 = "Garchomp";
  }
  else if (pokemon2 === charizard) {
    name2 = "Charizard";
  }
  else if (pokemon2 === pikachu) {
    name2 = "Pikachu";
  }
}

// displays the pokemons health as a simple number
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


// theses were small codes which took the type and then dealt damage
function playerAttacks() {
  typeChart();
  pokemon2 -= round(damage);
}

function compAttacks() {
  typeChart();
  pokemon1 -= round(damage);
}


// this is what assigned the players move it's target, type and damage
function playerMoves() {
  if (pokemon1 === lucario) {
    if (playerMove === "Aura Sphere") {
      target = pokemon2;
      moveType = "fighting";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Flash Cannon") {
      target = pokemon2;
      moveType = "steel";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Crunch") {
      target = pokemon2;
      moveType = "dark";
      damage = (80 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Psychic") {
      target = pokemon2;
      moveType = "psychic";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
  }  
  if (pokemon1 === garchomp) {
    if (playerMove === "Crunch") {
      target = pokemon2;
      moveType = "dark";
      damage = (80 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Dragon Claw") {
      target = pokemon2;
      moveType = "dragon";
      damage = (80 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Earthquake") {
      target = pokemon2;
      moveType = "ground";
      damage = (100 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Stone Edge") {
      target = pokemon2;
      moveType = "Rock";
      damage = (100 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
  }
  if (pokemon1 === pikachu) {
    if (playerMove === "ThunderBolt") {
      target = pokemon2;
      moveType = "electric";
      damage = (90 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Iron Tail") {
      target = pokemon2;
      moveType = "steel";
      damage = (90 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Play Rough") {
      target = pokemon2;
      moveType = "fairy";
      damage = (90 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Surf") {
      target = pokemon2;
      moveType = "water";
      damage = (90 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
  }
  if (pokemon1 === charizard) {
    if (playerMove === "Flamethrower") {
      target = pokemon2;
      moveType = "fire";
      damage = (90 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Dragon Pulse") {
      target = pokemon2;
      moveType = "dragon";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Air Slash") {
      target = pokemon2;
      moveType = "flying";
      damage = (75 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (playerMove === "Fire Punch") {
      target = pokemon2;
      moveType = "fire";
      damage = (75 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
  }
}

// this is the same as above, but for the computer and choses a move at random
function compMoves() {
  if (pokemon2 === lucario) {
    compMove = random(["Aura Sphere", "Flash Cannon", "Crunch,", "Psychic"]);
    if (compMove === "Aura Sphere") {
      target = pokemon1;
      moveType = "fighting";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Flash Cannon") {
      target = pokemon1;
      moveType = "steel";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Crunch") {
      target = pokemon1;
      moveType = "dark";
      damage = (80 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Psychic") {
      target = pokemon1;
      moveType = "psychic";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
  }  
  if (pokemon2 === garchomp) {
    compMove = random(["Crunch", "Dragon Claw", "Earthquake", "Stone Edge"]);
    if (compMove === "Crunch") {
      target = pokemon1;
      moveType = "dark";
      damage = (80 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Dragon Claw") {
      target = pokemon1;
      moveType = "dragon";
      damage = (80 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Earthquake") {
      target = pokemon1;
      moveType = "ground";
      damage = (100 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Stone Edge") {
      target = pokemon1;
      moveType = "Rock";
      damage = (100 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
  }
  if (pokemon2 === pikachu) {
    compMove = random(["Thunderbolt", "Iron Tail", "Play Rough", "Surf"]);
    if (compMove === "Thunderbolt") {
      target = pokemon1;
      moveType = "electric";
      damage = (90 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Iron Tail") {
      target = pokemon1;
      moveType = "steel";
      damage = (90 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Play Rough") {
      target = pokemon1;
      moveType = "fairy";
      damage = (90 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Surf") {
      target = pokemon1;
      moveType = "water";
      damage = (90 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
  }
  if (pokemon2 === charizard) {
    compMove = random(["Flamethrower", "Dragon Pulse", "Air Slash", "Fire Punch"]);
    if (compMove === "Flamethrower") {
      target = pokemon1;
      moveType = "fire";
      damage = (90 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Dragon Pulse") {
      target = pokemon1;
      moveType = "dragon";
      damage = (80 * (pokemon1.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Air Slash") {
      target = pokemon1;
      moveType = "flying";
      damage = (75 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
    else if (compMove === "Fire Punch") {
      target = pokemon1;
      moveType = "fire";
      damage = (75 * (pokemon1.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
    }
  }
}

// checked if you clicked a move, and them returned the results to the function above
function mousePressed() {
  if (mouseX >= windowWidth*(5/8) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight && state === "battle") {
    state = "moves";
  }
  if(state === "moves" && mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) {
    if (pokemon1 === lucario) {
      playerMove = "Aura Sphere";
    }
    else if (pokemon1 === garchomp) {
      playerMove = "Crunch";
    }
    else if (pokemon1 === pikachu) {
      playerMove = "Thunderbolt";
    }
    else if (pokemon1 === charizard) {
      playerMove = "Flamethrower";
    }
    state = "prepAttack";
  }
  else if(state === "moves" && mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) {
    if (pokemon1 === lucario) {
      playerMove = "Flash Cannon";
    }
    else if (pokemon1 === garchomp) {
      playerMove = "Dragon Claw";
    }
    else if (pokemon1 === pikachu) {
      playerMove = "Iron Tail";
    }
    else if (pokemon1 === charizard) {
      playerMove = "Dragon Pulse";
    }
    state = "prepAttack";
  }
  else if(state === "moves" && mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(7/8) && mouseY <= windowHeight) {
    if (pokemon1 === lucario) {
      playerMove = "Crunch";
    }
    else if (pokemon1 === garchomp) {
      playerMove = "Eathquake";
    }
    else if (pokemon1 === pikachu) {
      playerMove = "Play Rough";
    }
    else if (pokemon1 === charizard) {
      playerMove = "Air Slash";
    }
    state = "prepAttack";
  }
  else if(state === "moves" && mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight) {
    if (pokemon1 === lucario) {
      playerMove = "Psychic";
    }
    else if (pokemon1 === garchomp) {
      playerMove = "Rock Slide";
    }
    else if (pokemon1 === pikachu) {
      playerMove = "Surf";
    }
    else if (pokemon1 === charizard) {
      playerMove = "Fire Punch";
    }
    state = "prepAttack";
  }
 }


// loads the pokemon sprites
function loadPokemon() { //Loads the pokemon sprites into the game, sixing and locating them correctly
  imageMode(CENTER);
  if (pokemon1 === lucario) {
    image(lucarioBIMG, windowWidth/4.5, windowHeight - lucarioBIMG.height*2.8, lucarioBIMG.width *5, lucarioBIMG.height*5);
  }
  else if (pokemon1 === pikachu) {
    image(pikachuBIMG, windowWidth/4.5, windowHeight - pikachuBIMG.height*3.5, pikachuBIMG.width *5, pikachuBIMG.height*5);
  }
  else if (pokemon1 === charizard) {
    image(charizardBIMG, windowWidth/4.5, windowHeight - charizardBIMG.height*3, charizardBIMG.width *5, charizardBIMG.height*5);
  }
  else if (pokemon1 === garchomp) {
    image(garchompBIMG, windowWidth/4, windowHeight - garchompBIMG.height*2.5, garchompBIMG.width*5, garchompBIMG.height*5);
  }


  if (pokemon2 === lucario) {
    image(lucarioFIMG, windowWidth*(5.3/7), windowHeight/2.4, lucarioFIMG.width*5, lucarioFIMG.height*5);
  }
  else if (pokemon2 === pikachu) {
    image(pikachuFIMG, windowWidth*(5.3/7), windowHeight/2, pikachuFIMG.width*5, pikachuFIMG.height*5);
  }
  else if (pokemon2 === charizard) {
    image(charizardFIMG, windowWidth*(5.3/7), windowHeight/2.5, charizardFIMG.width*5, charizardFIMG.height*5);
  }
  else if (pokemon2 === garchomp) {
    image(garchompFIMG, windowWidth*(5.3/7), windowHeight/2.5, garchompFIMG.width*5, garchompFIMG.height*5);
  }
}

// took the pokemons type, and checked for the move type to see if the damage is multiplied
function typeChart() {
  if (target === garchomp) {
    if (moveType === "fairy" || moveType === "dragon") {
      damage = damage *2;
    }
    else if (moveType === "ice") {
      damage = damage *4;
    }
    else if (moveType === "poison" || moveType === "rock" || moveType === "fire") {
      damage = damage *0.5;
    }
    else if (moveType === "electric") {
      damage = 0;
    }
    else {
      damage;
    }
  }

  if (target === pikachu) {
    if (moveType === "ground") {
      damage = damage *2;
    }
    else if (moveType === "electric" || moveType === "steel" || moveType === "flying") {
      damage = damage *0.5;
    }
    else {
      damage;
    }
  }

  if (target === charizard) {
    if (moveType === "water" || moveType === "electric") {
      damage = damage *2;
    }
    else if (moveType === "rock") {
      damage = damage *4;
    }
    else if (moveType === "poison" || moveType === "fairy" || moveType === "fire") {
      damage = damage *0.5;
    }
    else if (moveType === "grass") {
      damage = damage *0.25;
    }
    else if (moveType === "ground") {
      damage = 0;
    }
    else {
      damage;
    }
  }

  if (target === lucario) {
    if (moveType === "Fighting" || moveType === "Ground" || moveType === "Fire") {
      damage = damage *2;
    }
    else if (moveType === "Normal" || moveType === "Steel" || moveType === "Grass" || moveType === "Ice" || moveType === "Dragon" || moveType === "Dark") {
      damage = damage * 0.5;
    }
    else if (moveType === "Rock" || moveType === "Bug") {
      damage = damage *0.25;
    }
    else if (moveType === 'Poison") {
      damage = 0;
    }
  }
}
