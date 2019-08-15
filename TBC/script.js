var playerPanel = document.getElementById("objPlayer");

var txtAIHP = document.getElementById("txtAIHP");
var txtAIName = document.getElementById("txtAIName");
var txtPlayerHP = document.getElementById("txtPlayerHP");
var txtPlayerName = document.getElementById("txtPlayerName");

var btnAttack = document.getElementById("btnAttack");
var btnBlock = document.getElementById("btnBlock");
var btnItems = document.getElementById("btnItems");
var btnRetry = document.getElementById("btnRetry");

var txtGameStatus = document.getElementById("txtGameStatus");
var txtOutcome = document.getElementById("txtOutcome");

var itmSwordOfDoom = {
  name: "Sword of Doom",
  critChanceModifier: 10 // percentage reduction to required crit roll
};

var objPlayer = {
  name: "Player 1",
  hp: 100,
  isBlocking: false,
  isAlive: true,
  toHit: 0,
  armourRating: 0,
  damage: 0,
  critReq: 100, // required roll to land a critical strike
  critMod: itmSwordOfDoom.critChanceModifier, // Percentage reduction on required crit roll

  block: function() {
    this.armourRating = getRandomNumber(50); // INCREASE THE ARMOUR RATING BY RND NUM
    txtOutcome.innerHTML = (`You block for ${this.armourRating}`);
  },

  attackHeavy: function() {
    this.armourRating = 0;
    this.critReq = 100;
    this.toHit = getRandomNumber(100);
    if (this.toHit >= 10) { // Check to see if the attack hits
      this.critReq = this.critReq - critCalculator(this.critReq, this.critMod);
      if (this.toHit >= this.critReq) {
        this.damage = Math.floor((this.toHit / 1.5) - objAI.armourRating);
      } else {
        this.damage = Math.floor((this.toHit / 2) - objAI.armourRating); // assign the damage equal to the toHit
      }

      if (this.damage <= 0) {
        txtOutcome.innerHTML = (`${objAI.name} blocked the attack!`); // if the damage is less than the armour, its a blocked attack
      } else {
        objAI.hp = objAI.hp - this.damage;
        if (this.toHit >= this.critReq){
          txtOutcome.innerHTML = (`You dealt ${this.damage} critical damage!`);
          this.critStatus = false;
        } else {
          txtOutcome.innerHTML = (`You dealt ${this.damage} damage!`);
        }
      }

      if (objAI.hp <= 0) {
        objAI.hp = 0;
        txtGameStatus.innerHTML = "VICTORY";
        btnRetry.style.display = "inline-block";
        if (this.toHit >= this.critReq) {
          txtOutcome.innerHTML = (`You killed ${objAI.name} by dealing ${this.damage} critical damage!`);
        } else {
          txtOutcome.innerHTML = (`You killed ${objAI.name} by dealing ${this.damage} damage!`);
        }
      }
    } else {
      txtOutcome.innerHTML = "You Missed!";
    }
  }
};

var objAI = {
  name: "Crag-Maw",
  hp: 100,
  isBlocking: false,
  isAlive: true,
  toHit: 0,
  armourRating: 0,
  damage: 0,
  critReq: 100,
  critMod: 5,

  block: function() {
    this.armourRating = getRandomNumber(50); // INCREASE THE ARMOUR RATING BY RND NUM
    txtOutcome.innerHTML = (`${this.name} blocks for ${this.armourRating}`);
  },

  attackHeavy: function() {
    this.armourRating = 0;
    this.critReq = 100;
    this.toHit = getRandomNumber(100);
    if (this.toHit >= 10) {
      this.critReq = this.critReq - critCalculator(this.critReq, this.critMod);
      if (this.toHit >= this.critReq) {
        this.damage = Math.floor((this.toHit / 1.5) - objPlayer.armourRating);
      } else {
        this.damage = Math.floor((this.toHit / 2) - objPlayer.armourRating);
      }

      if (this.damage <= 0) {
        txtOutcome.innerHTML = "You blocked the attack!";
      } else {
        objPlayer.hp = objPlayer.hp - this.damage;
        if (this.toHit >= this.critReq) {
          txtOutcome.innerHTML = (`${this.name} dealt ${this.damage} critical damage to you!`);
        } else {
          txtOutcome.innerHTML = (`${this.name} dealt ${this.damage} damage to you!`);
        }
      }

      if (objPlayer.hp <= 0) {
        objPlayer.hp = 0;
        txtGameStatus.innerHTML = "DEFEAT";
        btnRetry.style.display = "inline-block";
        if (this.toHit >= this.critReq){
          txtOutcome.innerHTML = (`${objAI.name} killed you by dealing ${this.damage} critical damage!`)
        } else {
          txtOutcome.innerHTML = (`${objAI.name} killed you by dealing ${this.damage} damage!`)
        }
      }
    } else {
      txtOutcome.innerHTML = (`${this.name} missed!`);
    }
  }
}

function critCalculator(critReq, critMod) {
  return (critReq * critMod) / 100;
}

function getRandomNumber(max) {
  var number = Math.floor(Math.random() * max);
  return number;
}

function makeDecision() {
  var choices = ["attack", "block"];
  return choices[getRandomNumber(2)];
}

function toggleInput(trueOrFalse) {
  btnAttack.disabled = trueOrFalse;
  btnBlock.disabled = trueOrFalse;
  btnItems.disabled = trueOrFalse;
}

function aiTurn() {
  txtGameStatus.innerHTML = `${objAI.name}'s Turn!`;
  objAI.armourRating = 0;
  setTimeout(function() {
    var choice = makeDecision();
    if (choice == "attack" || objPlayer.hp < 50) {
      objAI.attackHeavy();
      txtPlayerHP.innerHTML = `HP: ${objPlayer.hp}`;
    } else if (choice == "block") {
      objAI.block();
    }

    if (objPlayer.hp > 0) {
      txtGameStatus.innerHTML = "Your turn!";
    }
    toggleInput(false);
  }, 2000);
}

btnAttack.onclick = function() {
  toggleInput(true);
  if (objPlayer.hp > 0) {
    objPlayer.attackHeavy();
    txtAIHP.innerHTML = (`HP: ${objAI.hp}`);
    if (objAI.hp > 0) {
      aiTurn();
    }
  }
}

btnBlock.onclick = function() {
  toggleInput(true);
  if (objPlayer.hp > 0) {
    objPlayer.block();
    aiTurn();
  }
}

btnRetry.onclick = function() {
  txtGameStatus.innerHTML = "Your Turn!";
  txtOutcome.innerHTML = "Make a move!";
  objAI.hp = 100;
  objPlayer.hp = 100;
  txtAIHP.innerHTML = (`HP: ${objAI.hp}`);
  txtPlayerHP.innerHTML = (`HP: ${objAI.hp}`);
  btnRetry.style.display = "none";
  toggleInput(false);
}
