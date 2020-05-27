/* eslint-disable no-console */
"use strict";

/* global Decimal*/

let game;
let keke;
let upgrade;
let me;


  game = {
    cash: new Decimal(0),
    highestCash: new Decimal(0),
    upgradesPurchased: [],
    charactersHired: [],
    cashPerSecond: new Decimal(0),
    tab: "game",
    version: 2,
      keke: {
        kekespushed: 0,
        kekes: new Decimal(0),
        kekeCost: new Decimal(50),
        multiplier: new Decimal(1),
        cashPerSecond: new Decimal(0),
        unlocked: false
    },
    upgrade: {
      multiplier3: new Decimal(1),
    },
    me: {
      mespushed: 0,
      mes: new Decimal(0),
      meCost: new Decimal(1000000),
      multiplier: new Decimal(1),
      multiplierPerSecond: new Decimal(0),
      appliedMult: new Decimal(0),
      totalMultiplier: new Decimal(1),
      unlocked: false
    }
  };


// Init function
function reset() {
  game = {
    cash: new Decimal(0),
    highestCash: new Decimal(0),
    upgradesPurchased: [],
    charactersHired: [],
    cashPerSecond: new Decimal(0),
    tab: "game",
    version: 2, 
      keke: {
        unlocked: false,
        kekespushed: 0,
        kekes: new Decimal(0),
        kekeCost: new Decimal(50),
        multiplier: new Decimal(1),
        cashPerSecond: new Decimal(0),
    },
    upgrade: {
      multiplier3: new Decimal(1)
    },
    me: {
      mespushed: 0,
      mes: new Decimal(0),
      meCost: new Decimal(1000000),
      multiplier: new Decimal(1),
      multiplierPerSecond: new Decimal(0),
      appliedMult: new Decimal(0),
      totalMultiplier: new Decimal(1),
      unlocked: false
    }
  };
}

function unDecimalifySave() {
  game.cash = new Decimal(game.cash);
  game.highestCash = new Decimal(game.highestCash);
  game.cashPerSecond = new Decimal(game.cashPerSecond);
  game.keke.kekes = new Decimal(game.keke.kekes);
  game.keke.kekeCost = new Decimal(game.keke.kekeCost);
  game.keke.multiplier = new Decimal(game.keke.multiplier);
  game.keke.cashPerSecond = new Decimal(game.keke.cashPerSecond);
  game.upgrade.multiplier3 = new Decimal(game.upgrade.multiplier3);
  game.me.mes = new Decimal(game.me.mes);
  game.me.meCost = new Decimal(game.me.meCost);
  game.me.multiplier = new Decimal(game.me.multiplier);
  game.me.multiplierPerSecond = new Decimal(game.me.multiplierPerSecond);
  game.me.appliedMult = new Decimal(game.me.appliedMult);
  game.me.totalMultiplier = new Decimal(game.me.totalMultiplier);
}

function fixUndefined() {
  if (game.upgrade === undefined) game.upgrade = { multiplier3: new Decimal(1) };
  if (game.version === undefined) game.version = 1;
  if (game.me === undefined) game.me = 
  { mespushed: 0, mes: new Decimal(0), meCost: new Decimal(1000000), 
    multiplier: new Decimal(1), multiplierPerSecond: new Decimal(0), 
    appliedMult: new Decimal(0), totalMultiplier: new Decimal(1) };
  unDecimalifySave();
}

function versionCheck() {
  if (game.version < 2) {
    if (!game.upgrade) game.upgrade = { multiplier3: new Decimal(1), };
    game.version = 2;
    unDecimalifySave();
  }
  if (game.version < 3) {
    if (!game.me) game.me = { mespushed: 0, mes: new Decimal(0), meCost: new Decimal(1000000),
     multiplier: new Decimal(1), multiplierPerSecond: new Decimal(0), appliedMult: new Decimal(0),
      totalMultiplier: new Decimal(1) };
  }
}

function loadGame(loadgame) {
  fixUndefined();
  versionCheck();
  unDecimalifySave();
    reset();
    try {
      game = JSON.parse(loadgame);
      fixUndefined();
      versionCheck();
      unDecimalifySave();
  
      const style = game.keke.unlocked ? "display:block" : "display:none";
      document.getElementById("character1-button").style = style;
      document.getElementById("character1-keketext").style = style;
      document.getElementById("character1-istext").style = style;
      document.getElementById("character1-heretext").style = style;
      document.getElementById("character1").style = style;
      document.getElementsByClassName("kekeInfo1").style = style;
      document.getElementsByClassName("kekeInfo2").style = style;
      document.getElementsByClassName("CPSBreakdown").style = style;

      const style2 = game.me.unlocked ? "display:block" : "display:none";
      document.getElementById("character2-button").style = style2;
      document.getElementById("character2-metext").style = style2;
      document.getElementById("character2-istext").style = style2;
      document.getElementById("character2-heretext").style = style2;
      document.getElementById("character2").style = style2;
      document.getElementsByClassName("meInfo1").style = style2;
      document.getElementsByClassName("meInfo2").style = style2;
      update();
      formatThings();
    } catch (error) {
      console.log(`GAME is BROKEN! Error at function loadGame() when parsing save string:\n${error} 
      if you're seeing this after resetting your save, disregard it. I have no idea how to fix it, so :shrug:`);
      
    }
}

function initialize() {
  const loadgame = LZString.decompressFromBase64(localStorage.getItem("babamakecash-save"));
  if (loadgame !== null) {
    showTab("game");
    loadGame(loadgame);
    console.log("Got save from local storage...");
  }
}
// End

// notations
const scientific = new ADNotations.ScientificNotation();
const engineering = new ADNotations.EngineeringNotation();
const mixedScientific = new ADNotations.MixedScientificNotation();
const logarithm = new ADNotations.LogarithmNotation();
const roman = new ADNotations.RomanNotation();
const imperial = new ADNotations.ImperialNotation();
let notation = scientific;

function changeToADifferentNotation(id) {
  notation = id;
}
// Notation buttons. You can do a similar thing with a dropdown, google up something like "HTML JS dropdown"
document.getElementById("scientific").onclick = function() {
  notation = scientific;
};

document.getElementById("engineering").onclick = function() {
  notation = engineering;
};


document.getElementById("mixedScientific").onclick = function() {
  notation = mixedScientific;
};

document.getElementById("logarithm").onclick = function() {
  notation = logarithm;
};

document.getElementById("roman").onclick = function() {
  notation = roman;
};

document.getElementById("imperial").onclick = function() {
  notation = imperial;
};
// End

// UI updating

function formatThings() {
  document.getElementById("cash_number").textContent = notation.format(game.cash, 2);
  document.getElementById("kekeCost").textContent = notation.format(game.keke.kekeCost, 2);
  document.getElementById("cashstat").textContent = notation.format(game.highestCash, 2);
} 
// I'm sorry
// this function is entirely redundant i just wanted to have this
formatThings();

function pluralize(word, amount) {
  return amount.eq(1) ? word : (`${word}s`);
}

function showID(id, condition) {
  try {
    document.getElementById(id).style.display = condition ? "block" : "none";
  } catch (error) {
    console.log(`Wrong ID: ${id}\n${error}`);
  }
}


function update() {
  document.getElementById("cash_number").textContent = game.cash;
  document.getElementById("kekeCost").textContent = notation.format(game.keke.kekeCost, 2, 2);
  document.getElementById("meCost").textContent = notation.format(game.me.meCost, 2, 2);
  document.getElementById("cashstat").textContent = game.highestCash;

  document.getElementById("kekeAmount").textContent = `You have ${game.keke.kekes} 
  ${pluralize("Keke", game.keke.kekes)}`;

  document.getElementById("kekeMultiplier").textContent = `x${notation.format(game.keke.multiplier, 2, 2)}`;
  document.getElementById("meAmount").textContent = `You have ${game.me.mes} ${pluralize("Me", game.me.mes)}`;
  document.getElementById("meMultiplier").textContent = `x${notation.format(game.me.multiplier, 2, 2)}`;

  document.getElementById("CPSCount").textContent = `you are getting 
  ${notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)} cash per second`;

 document.getElementById("CPSCountText").innerHTML = `keke is generating 
 ${notation.format(game.keke.cashPerSecond, 2, 1)} cash per second <br> mutliplied
  by the total multiplier of ${notation.format(getTotalMultiplier(), 2, 2)}, you are
  getting ${notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)} cash per second.`;

  if (!game.upgradesPurchased.includes("upgrade2")) {

  document.getElementById("BreakdownInStats").innerHTML = `keke is generating 
  ${notation.format(game.keke.cashPerSecond, 2, 1)} cash per second <br> mutliplied
  by her multiplier of ${notation.format(game.keke.multiplier, 2, 2)}, you are getting
  ${notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)} cash per second.`;

  } else if (!game.upgradesPurchased.includes("upgrade3")) {

    document.getElementById("BreakdownInStats").innerHTML = `keke is generating 
    ${notation.format(game.keke.cashPerSecond, 2, 1)} cash per second <br> mutliplied
    by her multiplier of ${notation.format(game.keke.multiplier, 2, 2)}, multiplied by
    the second upgrade's multiplier of 2, you are getting 
    ${notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)} cash per second.`;
  
  } else if (game.upgradesPurchased.includes("upgrade2") && game.upgradesPurchased.includes("upgrade3")) {

    document.getElementById("BreakdownInStats").innerHTML = `keke is generating 
    ${notation.format(game.keke.cashPerSecond, 2, 1)} cash per second <br> mutliplied
    by her multiplier of ${notation.format(game.keke.multiplier, 2, 2)}, <br> multiplied
    by the second upgrade's multiplier of 2, <br> multiplied by the third upgrade's multiplier
    of ${notation.format(game.upgrade.multiplier3, 2, 2)} <br> you are getting 
    ${notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)} cash per second.`;
  
  } else if (game.upgradesPurchased.includes("upgradeME")) {

    document.getElementById("BreakdownInStats").innerHTML = `keke is generating 
    ${notation.format(game.keke.cashPerSecond, 2, 1)} cash per second <br> mutliplied
    by her multiplier of ${notation.format(game.keke.multiplier, 2, 2)}, <br> multiplied
    by the second upgrade's multiplier of 2, <br> multiplied by the third upgrade's multiplier
    of ${notation.format(game.upgrade.multiplier3, 2, 2)}, multiplied by ME's generated multiplier
    of ${notation.format(game.me.totalMultiplier, 2, 2)} <br> you are getting 
    ${notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)} cash per second.`;
  
  } else {
    document.getElementById("BreakdownInStats").innerHTML = `haha fuck you <br> 
    if you're seeing this, something went desparately wrong`;
  } 
  formatThings();
}

  if (screen.width < 900 || window.innerWidth < 900) {
    document.getElementById("cash").style.position = "absolute";
    document.getElementById("cash").style.top = "400px";
    document.getElementById("cash").style.width = "97%";
  } else {
    document.getElementById("cash").style.position = "relative";
    document.getElementById("cash").style.top = "0px";
    document.getElementById("cash").style.width = "600px";
  }

update();

// End

// defining upgrades showing as none or some
function checkIfCanShowThings() {
  // Show("upgrade1", true)
 if (game.cash >= 10) { 
   // For upgrade1
showID("upgrade1", true);
} else {
   showID("upgrade1", false);
}
if (game.cash.gte(100) || game.keke.kekes.gte(4)) { 
  // For upgrade2
  showID("upgrade2", true);
} else {
  showID("upgrade2", false);
}
if (game.cash.gte(10000) && game.upgradesPurchased.includes("upgrade2")) {
  showID("upgrade3", true);
} else {
  showID("upgrade3", false);
}
if (game.upgradesPurchased.includes("upgrade3") && game.cash.gte(1e5)) {
showID("upgradeME", true);
} else {
showID("upgradeME", false);
}

// Completely removes upgrades from showing
  if (game.upgradesPurchased.includes("upgrade1") && game.cash >= 10) {
    showID("upgrade1", false);
  }
  if (game.upgradesPurchased.includes("upgrade2")) {
    showID("upgrade2", false);
  }
  if (game.upgradesPurchased.includes("upgrade3")) {
    showID("upgrade3", false);
  }
  if (game.upgradesPurchased.includes("upgradeME")) {
    showID("upgradeME", false);
  }
// Kekecharacter show/hide if

function showAllKekeThings() {
  showID("character1-button", true);
  showID("character1-keketext", true);
  showID("character1-istext", true);
  showID("character1-heretext", true);
  showID("character1", true);
  showID("kekeAmount", true);
  showID("kekeMultiplier", true);
}

function showAllMeThings() {
  showID("character2-button", true);
  showID("character2-metext", true);
  showID("character2-istext", true);
  showID("character2-heretext", true);
  showID("character2", true);
  showID("meAmount", true);
  showID("meMultiplier", true);
}

if (game.upgradesPurchased.includes("upgrade1") && game.cash >= 10) {
  showAllKekeThings();
  game.keke.unlocked = true;
  showID("upgrade1", false);
}

if (game.upgradesPurchased.includes("upgrade3") && game.cash.gte(1e5)) {
  showAllMeThings();
  game.me.unlocked = true;
}

if (game.charactersHired.includes("keke")) { 
  // Keeps keke showing no matter what
  showID("character1-button", true);
  showID("character1-keketext", true);
  showID("character1-istext", false);
  showID("character1-heretext", false);
  showID("character1", true);
  showID("kekeAmount", true);
  showID("kekeMultiplier", true);
}
if (game.charactersHired.includes("me")) {
  showID("character2-button", true);
  showID("character2-metext", true);
  showID("character2-istext", false);
  showID("character2-heretext", false);
  showID("character2", true);
  showID("meAmount", true);
  showID("meMultiplier", true);
}
}
// End 

// for highest ever cash
function checkIfHighestCanBeIncremented() {
  if (game.cash.gt(game.highestCash)) {
    game.highestCash = game.cash;
  }
}
// End

// how purchasing upgrades works. checks array and then subtracts cost and sets upgrade as not showing.
function purchaseUpgrade(id) {
  game.upgradesPurchased.push(id); 
  // Used because it doesnt work by itself in html?
 if (game.upgradesPurchased.includes("upgrade1")) {
  game.cash = game.cash.minus(10);
showID("upgrade1", false);
}
if (game.upgradesPurchased.includes("upgrade2")) {
  game.cash = game.cash.minus(500);
  showID("upgrade2", false);
}
if (game.upgradesPurchased.includes("upgrade3")) {
  game.cash.minus(50000);
  showID("upgrade3", false);
}
if (game.upgradesPurchased.includes("upgradeME")) {
  game.cash.minus(5e5);
  showID("upgradeME", false);
  game.me.mes.add(1);
}
}
// End

// how characters are hired
function canBuyKeke() {
  return game.upgradesPurchased.includes("upgrade1") && game.cash >= 10;
}

function canBuyMe() {
  return game.upgradesPurchased.includes("upgradeME");
}

function isKekeHired() {
  return game.charactersHired.includes("keke");
}

function isMeHired() {
  return game.charactersHired.includes("me");
}

function getCurrentTab() {
  return game.tab;
}

function updateKeke() {
  const kekeShown = getCurrentTab() === "game" && (canBuyKeke() || isKekeHired());
  document.getElementsByClassName("kekeCharacter").style = kekeShown ? "display:block" : "display:none";
  document.getElementsByClassName("kekeInfo1").style = kekeShown ? "display:block" : "display:none";
  document.getElementsByClassName("kekeInfo2").style = kekeShown ? "display:block" : "display:none";
  update();
}
function updateMe() {
  const meShown = getCurrentTab() === "game" && (canBuyMe() || isMeHired());
  document.getElementsByClassName("meCharacter").style = meShown ? "display:block" : "display:none";
  document.getElementsByClassName("meInfo1").style = meShown ? "display:block" : "display:none";
  document.getElementsByClassName("meInfo2").style = meShown ? "display:block" : "display:none";
  update();
}

function updateCharacters() {
  updateKeke();
  updateMe();
  // Other characters in the future
}
function updateUI() {
  updateCharacters();
  checkIfCanShowThings();
}
function hireKeke() { 
  // Keke hiring
  if (game.cash.gte(game.keke.kekeCost)) {
    if (game.keke.kekespushed < 1) {
      game.charactersHired.push("keke"); 
      // Same reason as upgradesPurchased
      game.keke.kekespushed += 1;
    }
    if (game.keke.kekespushed === 1) {
      game.cash = game.cash.minus(game.keke.kekeCost);
      game.keke.kekeCost = game.keke.kekeCost.multiply(1.25).floor();
      document.getElementById("kekeCost").textContent = game.keke.kekeCost;
      // Game.cashPerSecond = game.cashPerSecond.add(2.5 * game.keke.multiplier);
      game.keke.cashPerSecond = game.keke.cashPerSecond.add(2.5);
      game.cashPerSecond = game.cashPerSecond.add(2.5);
      game.keke.kekes = game.keke.kekes.add(1);
      game.keke.multiplier = game.keke.multiplier.multiply(1.1);
      game.upgrade.multiplier3 = game.upgrade.multiplier3.plus(0.01);
      updateKeke();
    }
  }
}
// End
function hireMe() {
  if (game.cash.gte(game.me.meCost)) {
    if (game.me.mespushed < 1) {
      game.charactersHired.push("me");
      game.me.mespushed += 1;
    }
    if (game.me.mespushed === 1) {
      game.cash = game.cash.minus(game.me.meCost);
      game.me.meCost = game.me.meCost.multiply(2).floor();
      document.getElementById("meCost").textContent = game.me.meCost;
      game.me.multiplierPerSecond = game.me.multiplierPerSecond.add(1);
      game.me.mes = game.me.mes.add(1);
      game.me.multiplier = game.me.multiplier.add(0.25);
      updateMe();
    }
  }
}
function getTotalMultiplier() {
  // If (game.upgradesPurchased.includes("upgrade2")) {
  // return game.keke.multiplier.multiply(2)
  // } else if (!game.upgradesPurchased.includes("upgrade2") && game.upgrade.multiplier3.lte(1)) {
  // return game.keke.multiplier
  // } else if (game.upgradesPurchased.includes("upgrade2") && game.upgrade.multiplier3.gt(1)) {
  // return game.keke.multiplier.multiply(2).multiply(game.upgrade.multiplier3)
  // }
  let mult = new Decimal(1);
  if (game.keke.kekes.gt(1)) mult = mult.mul(game.keke.multiplier);
  if (game.upgradesPurchased.includes("upgrade2")) mult = mult.mul(2);
  if (game.upgradesPurchased.includes("upgrade3")) mult = mult.mul(game.upgrade.multiplier3);
  if (game.upgradesPurchased.includes("upgradeME")) mult = mult.mul(getTotalMultiplierMultiplier());
  return mult;
}

function getTotalMultiplierMultiplier() {
  function addToMultMult() {
    game.me.totalMultiplier = game.me.totalMultiplier.add(game.me.multiplierPerSecond);
  }
  setInterval(addToMultMult, 1000);
  return game.me.totalMultiplier;
}


// When you get a character, say, keke, this function is the one generating CPS
function addCPS() {
  const totalMultiplier = getTotalMultiplier();
game.cash = game.cash.add(game.cashPerSecond.multiply(totalMultiplier));
}
// End

// how CPC is calculated.
function moreCash() {
if (game.upgradesPurchased.length === 0) {
game.cash = game.cash.add(1);
} else if (game.upgradesPurchased.includes("upgrade1")) {
game.cash = game.cash.add(2);
} else if (game.upgradesPurchased.includes("upgradeME")) {
  game.cash = game.cash.multiply(getTotalMultiplierMultiplier());
}
}
// End

// tabs
function showTab(name) {
  const tabs = document.getElementsByClassName("tabbtn");
  for (const tab of tabs) { 
    // The for basically says: "for each tab in tabs do this" - kajfik
    tab.style.display = (tab.id === name) ? "block" : "none";
    game.tab = name;
  }
}
// End

// save
function saveGame() {
  const save = LZString.compressToBase64(JSON.stringify(game));
  window.localStorage.setItem("babamakecash-save", save);
  console.log("Saved game to local storage object 'babamakecash-save'");
}

function copyToClipboard(el) {
  // eslint-disable-next-line no-param-reassign
  el = (typeof el === "string") ? document.querySelector(el) : el;
  // eslint-disable-next-line require-unicode-regexp
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const editable = el.contentEditable;
      const readOnly = el.readOnly;
      el.contentEditable = true;
      el.readOnly = true;
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      el.setSelectionRange(0, 999999);
      el.contentEditable = editable;
      el.readOnly = readOnly;
  } else {
      el.select();
  }
  document.execCommand("copy");
}

function copyStringToClipboard(str) {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style = {
      position: "absolute",
      left: "-9999px"
    };
    document.body.appendChild(el);
    copyToClipboard(el);
    document.body.removeChild(el);
    alert("Copied to clipboard and placed in the developer Console.");
}


function exportSave() {
  const exportedSave = LZString.compressToBase64(JSON.stringify(game));
  copyStringToClipboard(exportedSave);
  console.log(exportedSave);
}

function importSave() {
  let loadgame = "";
  loadgame = LZString.decompressFromBase64(prompt("Paste in your save here.\nWill overwrite your current save!"));
  if (loadgame !== "") {
    loadGame(loadgame);
    saveGame();
  }
}

function resetSave() {
 const resetCheck = prompt("are you sure you wish to delete your save? type 'SAVE is DELETE' to delete it!");
if (resetCheck === "SAVE is DELETE") {
localStorage.removeItem("babamakecash-save");
initialize();
} else {
  saveGame();
  
}
}
// End

// running functions 
setInterval(update, 10);
setInterval(updateUI, 10);
setInterval(checkIfHighestCanBeIncremented, 10);
setInterval(addCPS, 1000);
setInterval(saveGame, 10000);
