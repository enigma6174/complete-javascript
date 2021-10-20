const BASIC_ATTACK = "BASIC_ATTACK";
const STRONG_ATTACK = "STRONG_ATTACK";
const BASIC_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 12;
const HEAL_VALUE = 20;

function getMaxLifeValues() {
  const inputValue = prompt("Please Set The Max Health Value For The Game");
  const parsedInputValue = parseInt(inputValue);

  if (isNaN(parsedInputValue) || parsedInputValue <= 0) {
    throw { message: "Invalid Input! Using Default Value 100" };
  }

  return parsedInputValue;
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(`[ERR] ${error.message}`);
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  // Save the player health before player dies
  const initialPlayerHealth = currentPlayerHealth;

  // Deal damage to player
  const damage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damage;

  // Logic to activate bonus life
  if (hasBonusLife && currentPlayerHealth <= 0) {
    console.log("[INFO] BONUS HEALTH ACTIVATED");
    removeBonusLife();
    hasBonusLife = false;
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
  }

  // Logic for deciding winner
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("PLAYER WINS!!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("MONSTER WINS!!");
  } else if (currentPlayerHealth <= 0 && currentPlayerHealth <= 0) {
    alert("FIGHT DRAWN!!");
  }

  // Logic to reset the game
  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  // Player attack type selection
  const maxDamage =
    mode === BASIC_ATTACK ? BASIC_ATTACK_VALUE : STRONG_ATTACK_VALUE;

  // Deal damage to monster
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster(BASIC_ATTACK);
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (HEAL_VALUE > chosenMaxLife - currentPlayerHealth) {
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

healBtn.addEventListener("click", healPlayerHandler);
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
