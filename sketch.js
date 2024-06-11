// CS-30 Major Project - Pokemon Battle simulator
// Ben McPherson
// May 1st - June 14th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



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
    moveButtons();
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
}

function displayMoves() {
  fill("black");
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Move One", windowWidth*(11.5/16), windowHeight*(13/16));
  text("Move Two", windowWidth*(14.5/16), windowHeight*(13/16));
  text("Move Three", windowWidth*(11.5/16), windowHeight*(15/16));
  text("Move Four", windowWidth*(14.5/16), windowHeight*(15/16));
}



function optionsBox() {
  fill("red");
  rect(windowWidth*5/8, windowHeight*(3/4), windowWidth, windowHeight);
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text("BATTLE", windowWidth*(13/16), windowHeight*(7/8));
}

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


function opponentMove() {

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

function mousePressed() {
  if (mouseX >= windowWidth*(5/8) && mouseX <= windowWidth && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight && state === "battle") {
    state = "moves";
  }
 
  // If the player has lucario and they select a move
  else if (pokemon1 === lucario && state === "moves") {
    // if move 1 is selected
    if(mouseX >= windowWidth*(5/8) && mouseX <= windowWidth*(13/16) && mouseY >= windowHeight*(3/4) && mouseY <= windowHeight*(7/8)) {


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
          opponentMove();
        }
        else {
          state = "victory";
        }
      }
      else { // If Lucario is slower - move 4
        opponentMove();
        if (pokemon1.HP > 0) {
          pokemon2.HP -= round(80 * (lucario.SPA/(pokemon2.SPD*2)) * random(0.85,1)/2);
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
