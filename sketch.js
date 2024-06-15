// CS-30 Major Project - Pokemon Battle simulator
// Ben McPherson
// May 1st - June 14th
//
// This code is a barebones, barely pokemon, battle simulator. It has the damage and a winner. Each pokemon does move depending on their speed stat
// but that is not notiable when playing the game (Just know it exists). It is missing the main components such as visual turns and type interaction (a BIG one), 
// which upsets me a bunch, but I couldn't get it working. I think it has to do with my massive mousePressed function, which is horribly coded and could 
// be simplified so much (I just ran out of time and I had done too much go to back at that point).
// There is a visual issue where the white side, which was going to hold the move history, eats up part of the left side of the screen, but code 1.md
// contains the older code which doesn't have that issue. 



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
let lucarioMoves = [];
let pikachuMoves = [];
let charizardMoves = [];
let garchompMoves = [];
let target;
let crit;
let STAB;
let sE;
let nVE;
let damage;
let moveType;
let moveUsed;
let state;
let counter;
let y;
let moveWasUsed = false;

// Loads all my images, sounds and gifs
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
}

// Makes the pokemon with the correct stats
class pokemon {
  constructor(HP, ATK, DEF, SPA, SPD, SPE, type1, type2, name) {
    this.HP = HP;
    this.ATK = ATK;
    this.DEF = DEF;
    this.SPA = SPA;
    this.SPD = SPD;
    this.SPE = SPE;
    this.type1 = type1;
    this.type2 = type2;
    this.name = name;
  }
}

// Makes the pokemon, and assigns them to the user and computer
function setup() {
  createCanvas(windowWidth, windowHeight);
  charizard = new pokemon(78, 84, 78, 109, 85, 100, "fire", "flying", "Charizard");
  pikachu = new pokemon(75, 80, 70, 95, 60, 120, "electric", "none", "Pikachu");
  garchomp = new pokemon(80, 100, 95, 80, 85, 102, "dragon", "ground", "Garchomp");
  lucario = new pokemon(70, 110, 70, 115, 70, 90, "fighting", "steel", "Lucario");
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
  y = 20;
  state = "opening";
}

// My long draw loop with many states
function draw() {
  if (state === "opening") {
    image(startScreen, 0, 0, windowWidth, windowHeight);
    if (key === " ") {
      battleMusic.loop();
      state = "battle";
    }
  }
  if (state === "battle") {
    imageMode(CORNER);
    image(bg, windowWidth*(1/4), 0, windowWidth, windowHeight);
    fill(255);
    rect(0, 0, windowWidth*(1/4), windowHeight);
    loadPokemon();
    healthbox();
    optionsBox();
  }
  if (state === "moves") {
    imageMode(CORNERS)
    image(bg, windowWidth*(1/4), 0, windowWidth, windowHeight);
    fill(255);
    rect(0, 0, windowWidth*(1/4), windowHeight);
    loadPokemon();
    healthbox();
    moveButtons();
    displayMoves();
    kill();
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
  if (state === "moveTextBox") {
    fill("220");
    rect(windowWidth*5/8, windowHeight*(3/4), windowWidth, windowHeight);
    fill("black");
    textSize(60);
    textAlign(CENTER, CENTER);
    text(pokemon1 + "used tackle", windowWidth*(13/16), windowHeight*(7/8));
    counter = counter + millis();
    if (millis() > counter + 2000);

  }
}

// Kills the pokemon and assigns a winner if someone falls below 0 HP. Occasionally bugs out and give Pikachu negative health, making him invincible
function kill() {
  if (pokemon1.HP <= 0) {
    state = "loss";
  }
  if (pokemon2.HP <= 0) {
    state = "victory";
  }
}

// Displays the move names
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
    text("Dragon Claw", windowWidth*(11.5/16), windowHeight*(13/16));
    text("Earth Quake", windowWidth*(14.5/16), windowHeight*(13/16));
    text("Crunch", windowWidth*(11.5/16), windowHeight*(15/16));
    text("Rock Slide", windowWidth*(14.5/16), windowHeight*(15/16));
  }
  if (pokemon1 === pikachu) {
    text("Thunderbolt", windowWidth*(11.5/16), windowHeight*(13/16));
    text("Iron Tail", windowWidth*(14.5/16), windowHeight*(13/16));
    text("Wild Charge", windowWidth*(11.5/16), windowHeight*(15/16));
    text("Play Rough", windowWidth*(14.5/16), windowHeight*(15/16));
  }
  if (pokemon1 === charizard) {
    text("Air Slash", windowWidth*(11.5/16), windowHeight*(13/16));
    text("Flamethrower", windowWidth*(14.5/16), windowHeight*(13/16));
    text("Dragon Pulse", windowWidth*(11.5/16), windowHeight*(15/16));
    text("Fire Punch", windowWidth*(14.5/16), windowHeight*(15/16));
  }
}

// Displays the battle button
function optionsBox() {
  fill("red");
  rect(windowWidth*5/8, windowHeight*(3/4), windowWidth, windowHeight);
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text("BATTLE", windowWidth*(13/16), windowHeight*(7/8));
}

// Displays the move buttons
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

// Displays the pokemons current health as a simple number
function healthbox() {
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(pokemon2.HP, windowWidth*(7/8), windowHeight/8);

  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(pokemon1.HP, windowWidth/3, windowHeight/8);
}

// Was supposed to print "Pokemon X used move Y", but never worked
function moveHistory() {
  if (moveWasUsed === true) {
    fill("black");
    textSize(10);
    textAlign(CENTER, CENTER);
    text(pokemon1.name + " used " + "a move", 10, windowHeight/y);
    moveWasUsed = false;
    y += 10;
  }
}


function opponentMove() {
// Randomly picks a move for the cpu
  if (pokemon2 === lucario) {
    pokemon1.HP -= round(random(round(80 * (pokemon2.SPA/(pokemon1.SPD*2)) * random(0.85,1)/2), round(80 * (pokemon2.SPA/(pokemon1.SPD*2)) * random(0.85,1)/2),  
                          round(80 * (pokemon2.SPA/(pokemon1.SPD*2)) * random(0.85,1)/2), round(80 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2)));
  }
  else if (pokemon2 === charizard) {
    pokemon1.HP -= round(random(round(75 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2), round(70 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2),  
                          round(90 * (pokemon2.SPA/(pokemon1.SPD*2)) * random(0.85,1)/2), round(80 * (pokemon2.SPA/(pokemon1.SPD*2)) * random(0.85,1)/2)));
  }
  else if (pokemon2 === garchomp) {
    pokemon1.HP -= round(random(round(80 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2), round(100 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2),  
                          round(80 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2), round(100 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2)));
  }
  else if (pokemon2 === pikachu) {
    pokemon1.HP -= round(random(round(80 * (pokemon2.SPA/(pokemon1.SPD*2)) * random(0.85,1)/2), round(120 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2),  
                          round(90 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2), round(90 * (pokemon2.ATK/(pokemon1.DEF*2)) * random(0.85,1)/2)));
  }
}

// Checks if the player picked a move
function mousePressed() {
  if (mouseX >= windowWidth*(5/8) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight && state === "battle") {
    state = "moves";
  }
 
  // If the player has lucario and they select a move
  else if (pokemon1 === lucario && state === "moves") {
    // if move 1 is selected
    if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) {
      moveWasUsed = true;
      if (lucario.SPE > pokemon2.SPE) { // If Lucario is faster - move 1
        pokemon2.HP -= round(80 * (lucario.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
            opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Lucario is slower - move 1
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (lucario.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 2 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) { 
      if (lucario.SPE > pokemon2.SPE) { // If Lucario is faster - move 2
        pokemon2.HP -= round(80 * (lucario.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Lucario is slower - move 2
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (lucario.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 3 is selected
    else if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(7/8) && mouseY <= windowHeight) { 

      if (lucario.SPE > pokemon2.SPE) { // If Lucario is faster - move 3
        pokemon2.HP -= round(80 * (lucario.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Lucario is slower - move 3
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (lucario.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
        
    }
     // if move 4 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight) {

      if (lucario.SPE > pokemon2.SPE) { // If Lucario is faster - move 4
        pokemon2.HP -= round(80 * (lucario.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          setTimeout(opponentMove, 5000);
        }
        else {
          state = "victory";
        }
      }
      else { // If Lucario is slower - move 4
        opponentMove();
        if (pokemon1.HP > 0) {
          setTimeout(pokemon2.HP -= round(80 * (lucario.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2));
        }
        else {
          state = "loss";
        }
      }    
    }
  }
  // If the player has Garchomp and they select a move
  else if (pokemon1 === garchomp && state === "moves") {
    // if move 1 is selected
    if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) {

      if (garchomp.SPE > pokemon2.SPE) { // If Garchomp is faster - move 1
        pokemon2.HP -= round(80 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Garchomp is slower - move 1
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 2 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) { 
      if (garchomp.SPE > pokemon2.SPE) { // If Garchomp is faster - move 2
        pokemon2.HP -= round(80 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Garchomp is slower - move 2
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);     
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 3 is selected
    else if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(7/8) && mouseY <= windowHeight) { 

      if (garchomp.SPE > pokemon2.SPE) { // If Garchomp is faster - move 3
        pokemon2.HP -= round(80 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Garchomp is slower - move 3
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
        
    }
     // if move 4 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight) {

      if (garchomp.SPE > pokemon2.SPE) { // If Garchomp is faster - move 4
        pokemon2.HP -= round(100 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Garchomp is slower - move 4
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(100 * (garchomp.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }    
    }
  }
  // If the player has Pikachu and they select a move
  else if (pokemon1 === pikachu && state === "moves") {
    // if move 1 is selected
    if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) {

      if (pikachu.SPE > pokemon2.SPE) { // If Pikachu is faster - move 1
        pokemon2.HP -= round(80 * (pikachu.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Pikachu is slower - move 1
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (pikachu.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 2 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) { 
      if (pikachu.SPE > pokemon2.SPE) { // If Pikachu is faster - move 2
        pokemon2.HP -= round(120 * (pikachu.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Pikachu is slower - move 2
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(120 * (pikachu.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);  
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 3 is selected
    else if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(7/8) && mouseY <= windowHeight) { 

      if (pikachu.SPE > pokemon2.SPE) { // If Pikachu is faster - move 3
        pokemon2.HP -= round(90 * (pikachu.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Pikachu is slower - move 3
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(90 * (pikachu.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
        
    }
     // if move 4 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight) {

      if (pikachu.SPE > pokemon2.SPE) { // If Pikachu is faster - move 4
        pokemon2.HP -= round(90 * (pikachu.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Pikachu is slower - move 4
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(90 * (pikachu.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }    
    }
  }
  // If the player has Charizard and they select a move
  else if (pokemon1 === charizard && state === "moves") {
    // if move 1 is selected
    if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) {

      if (charizard.SPE > pokemon2.SPE) { // If Charizard is faster - move 1
        pokemon2.HP -= round(90 * (charizard.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Charizard is slower - move 1
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(90 * (charizard.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 2 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) { 
      if (charizard.SPE > pokemon2.SPE) { // If Charizard is faster - move 2
        pokemon2.HP -= round(70 * (charizard.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Charizard is slower - move 2
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(70 * (charizard.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);   
        }
        else {
          state = "loss";
        }
      }
    }
    // if move 3 is selected
    else if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(7/8) && mouseY <= windowHeight) { 

      if (charizard.SPE > pokemon2.SPE) { // If Charizard is faster - move 3
        pokemon2.HP -= round(80 * (charizard.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Charizard is slower - move 3
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (charizard.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
        }
        else {
          state = "loss";
        }
      }
        
    }
     // if move 4 is selected
    else if(mouseX >= windowWidth*(13/16) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight) {

      if (charizard.SPE > pokemon2.SPE) { // If Charizard is faster - move 4
        pokemon2.HP -= round(75 * (charizard.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
        if (pokemon2.HP > 0) {
          opponentMove();
          state = "battle";
        }
        else {
          state = "victory";
        }
      }
      else { // If Charizard is slower - move 4
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(75 * (charizard.ATK/(pokemon2.DEF*2)) * random(0.85,1)/2);
          state = "battle";
        }
        else {
          state = "loss";
        }
      }    
    }
  }
}

function loadPokemon() { //Loads the pokemon sprites into the game, sizing and locating them correctly (mostly. Did kind of break last second when I was trying to get the move history working)
  imageMode(CENTER);
  if (pokemon1 === lucario) {
    image(lucarioBIMG, windowWidth/2.5, windowHeight - lucarioBIMG.height*2.8, lucarioBIMG.width *5, lucarioBIMG.height*5);
  }
  else if (pokemon1 === pikachu) {
    image(pikachuBIMG, windowWidth/2.5, windowHeight - pikachuBIMG.height*3.5, pikachuBIMG.width *5, pikachuBIMG.height*5);
  }
  else if (pokemon1 === charizard) {
    image(charizardBIMG, windowWidth/2.5, windowHeight - charizardBIMG.height*3, charizardBIMG.width *5, charizardBIMG.height*5);
  }
  else if (pokemon1 === garchomp) {
    image(garchompBIMG, windowWidth/2.5, windowHeight - garchompBIMG.height*2.5, garchompBIMG.width*5, garchompBIMG.height*5);
  }


  if (pokemon2 === lucario) {
    image(lucarioFIMG, windowWidth*(6/7), windowHeight/2.4, lucarioFIMG.width*5, lucarioFIMG.height*5);
  }
  else if (pokemon2 === pikachu) {
    image(pikachuFIMG, windowWidth*(6/7), windowHeight/2, pikachuFIMG.width*5, pikachuFIMG.height*5);
  }
  else if (pokemon2 === charizard) {
    image(charizardFIMG, windowWidth*(6/7), windowHeight/2.5, charizardFIMG.width*5, charizardFIMG.height*5);
  }
  else if (pokemon2 === garchomp) {
    image(garchompFIMG, windowWidth*(6/7), windowHeight/2.5, garchompFIMG.width*5, garchompFIMG.height*5);
  }
}
