const BASIC_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function endRound() {
  // Save the player health before player dies
  const initialPlayerHealth = currentPlayerHealth;

  // Deal damage to player
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

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
}

function attackMonster(mode) {
  let maxDamage;

  // Update player attack mode based on type
  if (mode === "BASIC_ATTACK") {
    maxDamage = BASIC_ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  // Deal damage to monster
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
  endRound();
}

function attackHandler() {
  attackMonster("BASIC_ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  console.log(`[INFO] currentPlayerHealth: ${currentPlayerHealth}`);
  console.log(`[INFO] playerHealthBar.value: ${playerHealthBar.value}`);
  if (HEAL_VALUE > chosenMaxLife - currentPlayerHealth) {
    console.log("[INFO] CANNOT HEAL MORE THAN INITIAL HEALTH!");
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
