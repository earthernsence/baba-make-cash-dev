/* global Decimal*/

let game
let keke
let upgrade


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
    },
    upgrade: {
      multiplier3: new Decimal(1),
    }
  }



//init function
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
    }
  }
}

function unDecimalifySave() {
  game.cash = new Decimal(game.cash)
  game.highestCash = new Decimal(game.highestCash)
  game.cashPerSecond = new Decimal(game.cashPerSecond)
  game.keke.kekes = new Decimal(game.keke.kekes)
  game.keke.kekeCost = new Decimal(game.keke.kekeCost)
  game.keke.multiplier= new Decimal(game.keke.multiplier)
  game.keke.cashPerSecond = new Decimal(game.keke.cashPerSecond)
  game.upgrade.multiplier3 = new Decimal(game.upgrade.multiplier3)
}

function fixUndefined() {
  if (game.upgrade === undefined) game.upgrade = { multiplier3: new Decimal(1) }
  if (game.version === undefined) game.version = 1
  unDecimalifySave()
}

function versionCheck() {
  if (game.version < 2) {
    if (!game.upgrade) game.upgrade = {multiplier3: new Decimal(1),};
    game.version = 2
    unDecimalifySave()
  }
}

function loadGame(loadgame) {
  fixUndefined()
  versionCheck()
  unDecimalifySave()
    reset()
    try {
      game = JSON.parse(loadgame)
      fixUndefined()
      versionCheck()
      unDecimalifySave()
  
      let style = game.keke.unlocked ? "display:block" : "display:none";
      document.getElementById("character1-button").style = style;
      document.getElementById("character1-keketext").style = style;
      document.getElementById("character1-istext").style = style;
      document.getElementById("character1-heretext").style = style;
      document.getElementById("character1").style = style;
      document.getElementsByClassName("kekeInfo1").style = style;
      document.getElementsByClassName("kekeInfo2").style = style;
      document.getElementsByClassName("CPSBreakdown").style = style;
      update()
      formatThings()
    } catch (error) {
      console.log("GAME is BROKEN! Error at function loadGame() when parsing save string:\n" + error)
      return;
    }
}

function initialize() {
  let loadgame = LZString.decompressFromBase64(localStorage.getItem("babamakecash-save"))
  if (loadgame != null) {
    showTab("game")
    loadGame(loadgame)
    console.log("Got save from local storage...")
  }
}
//end

//notations
const scientific = new ADNotations.ScientificNotation();
const engineering = new ADNotations.EngineeringNotation();
const mixedScientific  = new ADNotations.MixedScientificNotation();
const logarithm = new ADNotations.LogarithmNotation();
const roman = new ADNotations.RomanNotation();
const imperial = new ADNotations.ImperialNotation()
let notation = scientific;

function changeToADifferentNotation(id) {
  notation = id;
}
// Notation buttons. You can do a similar thing with a dropdown, google up something like "HTML JS dropdown"
document.getElementById("scientific").onclick = function() {
  notation = scientific;
}

document.getElementById("engineering").onclick = function() {
  notation = engineering;
}


document.getElementById("mixedScientific").onclick = function() {
  notation = mixedScientific;
}

document.getElementById("logarithm").onclick = function() {
  notation = logarithm;
}

document.getElementById("roman").onclick = function() {
  notation = roman;
}

document.getElementById("imperial").onclick = function() {
  notation = imperial;
}
//end

//UI updating

function formatThings() {
  document.getElementById("cash_number").textContent = notation.format(game.cash, 2);
  document.getElementById("kekeCost").textContent = notation.format(game.keke.kekeCost, 2);
  document.getElementById("cashstat").textContent = notation.format(game.highestCash, 2);
} // I'm sorry
// this function is entirely redundant i just wanted to have this
formatThings()

function pluralize(word, amount) {
  return amount.eq(1) ? word : (word + "s");
}

function showID(id, condition) {
  try {
    document.getElementById(id).style.display = condition ? "block" : "none";
  } catch(error) {
    console.log("Wrong ID: " + id + "\n" + error);
  }
}


function update() {
  document.getElementById("cash_number").textContent = game.cash
  document.getElementById("kekeCost").textContent = game.keke.kekeCost
  document.getElementById("cashstat").textContent = game.highestCash
  document.getElementById("kekeAmount").textContent = "You have " + game.keke.kekes + " " +pluralize("Keke", game.keke.kekes)
  document.getElementById("kekeMultiplier").textContent = "x" + notation.format(game.keke.multiplier, 2, 2)
  document.getElementById("CPSCount").textContent = "you are getting " + notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2) + " cash per second"
  if (!game.upgradesPurchased.includes("upgrade2")) {
  document.getElementById("CPSCountText").innerHTML = "keke is generating " + notation.format(game.keke.cashPerSecond, 2, 1) + " cash per second <br> mutliplied by her multiplier of " + notation.format(game.keke.multiplier, 2, 2) + ", you are getting " + notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)  + " cash per second."
  } else if (game.upgradesPurchased.includes("upgrade2")) {
    document.getElementById("CPSCountText").innerHTML = "keke is generating " + notation.format(game.keke.cashPerSecond, 2, 1) + " cash per second <br> mutliplied by her multiplier of " + notation.format(game.keke.multiplier, 2, 2) + ", multiplied by the second upgrade's multiplier of 2, you are getting " + notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)  + " cash per second."
  } else if (game.upgrade.multiplier3.gt(1)) {
    document.getElementById("CPSCountText").innerHTML = "keke is generating " + notation.format(game.keke.cashPerSecond, 2, 1) + " cash per second <br> mutliplied by her multiplier of " + notation.format(game.keke.multiplier, 2, 2) + ", multiplied by the second upgrade's multiplier of 2, multiplied by the third upgrade's multiplier of " + notation.format(game.upgrade.multiplier3, 2, 2) + " you are getting " + notation.format(game.cashPerSecond.multiply(getTotalMultiplier()), 2, 2)  + " cash per second."
  } else {
    document.getElementById("CPSCountText").innerHTML = "haha fuck you <br> if you're seeing this, something went desparately wrong"
  }
  formatThings()
}

  if (screen.width < 900 || window.innerWidth < 900) {
    document.getElementById('cash').style.position = "absolute"
    document.getElementById('cash').style.top = "400px"
    document.getElementById('cash').style.width = "97%"
  }
  else {
    document.getElementById('cash').style.position = "relative"
    document.getElementById('cash').style.top = "0px"
    document.getElementById('cash').style.width = "600px"
  }

update()

//end

//defining upgrades showing as none or some
function checkIfCanShowThings() {
  // show("upgrade1", true)
 if (game.cash >= 10) { // for upgrade1
showID("upgrade1", true)
} else {
   showID("upgrade1", false)
}
if (game.cash.gte(100) && game.keke.kekes.gte(4)) { // for upgrade2
  showID("upgrade2", true)
} else {
  showID("upgrade2", false)
}
if (game.cash.gte(10000) && game.upgradesPurchased.includes("upgrade2")) {
  showID("upgrade3", true)
} else {
  showID("upgrade3", false)
}

//completely removes upgrades from showing
  if (game.upgradesPurchased.includes("upgrade1") && game.cash >= 10) {
    showID("upgrade1", false)
  }
  if (game.upgradesPurchased.includes("upgrade2")) {
    showID("upgrade2", false)
  }
  if (game.upgradesPurchased.includes("upgrade3")) {
    showID("upgrade3", false)
  }
//kekecharacter show/hide if

function showAllKekeThings() {
  showID("character1-button", true)
  showID("character1-keketext", true)
  showID("character1-istext", true)
  showID("character1-heretext", true)
  showID("character1", true)
  showID("kekeAmount", true)
  showID("kekeMultiplier", true)
}

if (game.upgradesPurchased.includes("upgrade1") && game.cash >= 10) {
  showAllKekeThings()
  game.keke.unlocked = true
  showID("upgrade1", false)
}
if (game.charactersHired.includes("keke")) { //keeps keke showing no matter what
  showID("character1-button", true)
  showID("character1-keketext", true)
  showID("character1-istext", false)
  showID("character1-heretext", false)
  showID("character1", true)
  showID("kekeAmount", true)
  showID("kekeMultiplier", true)
  showID("TotalCPSBreakdownText", true)
}
}
//end 

//for highest ever cash
function checkIfHighestCanBeIncremented() {
  if (game.cash.gt(game.highestCash)) {
    game.highestCash = game.cash
  }
}
//end

//how purchasing upgrades works. checks array and then subtracts cost and sets upgrade as not showing.
function purchaseUpgrade(id) {
  game.upgradesPurchased.push(id); //used because it doesnt work by itself in html?
 if (game.upgradesPurchased.includes("upgrade1")) {
  game.cash = game.cash.minus(10);
showID("upgrade1", false)
}
if (game.upgradesPurchased.includes("upgrade2")) {
  game.cash = game.cash.minus(500)
  showID("upgrade2", false)
}
if (game.upgradesPurchased.includes("upgrade3")) {
  game.cash.minus(50000)
  showID("upgrade3", false)
}
}
//end

//how characters are hired
function canBuyKeke() {
  return game.upgradesPurchased.includes("upgrade1") && game.cash >= 10;
}

function isKekeHired() {
  return game.charactersHired.includes("keke");
}

function getCurrentTab() {
  return game.tab
}

function updateKeke() {
  let kekeShown = getCurrentTab() === "game" && (canBuyKeke() || isKekeHired());
  document.getElementById("chartable").style = kekeShown ? "display:block" : "display:none";
}
function updateCharacters() {
  updateKeke();
  // .. updateMe() etc or in the future something like:
}
function updateUI() {
  updateCharacters();
  checkIfCanShowThings()
}
function hireKeke() { //keke hiring
  if (game.cash.gte(game.keke.kekeCost)) {
    if (game.keke.kekespushed < 1) {
      game.charactersHired.push('keke'); //same reason as upgradesPurchased
      game.keke.kekespushed += 1
    }
    if (game.keke.kekespushed == 1) {
      game.cash = game.cash.minus(game.keke.kekeCost);
      game.keke.kekeCost = game.keke.kekeCost.multiply(1.25).floor();
      document.getElementById("kekeCost").textContent = game.keke.kekeCost
      //game.cashPerSecond = game.cashPerSecond.add(2.5 * game.keke.multiplier);
      game.keke.cashPerSecond = game.keke.cashPerSecond.add(2.5);
      game.cashPerSecond = game.cashPerSecond.add(2.5)
      game.keke.kekes = game.keke.kekes.add(1);
      game.keke.multiplier = game.keke.multiplier.multiply(1.1);
      game.upgrade.multiplier3 = game.upgrade.multiplier3.plus(0.01)
      updateKeke()
    }
  }
}
//end
function getTotalMultiplier() {
  /*if (game.upgradesPurchased.includes("upgrade2")) {
  return game.keke.multiplier.multiply(2)
  } else if (!game.upgradesPurchased.includes("upgrade2") && game.upgrade.multiplier3.lte(1)) {
    return game.keke.multiplier
  } else if (game.upgradesPurchased.includes("upgrade2") && game.upgrade.multiplier3.gt(1)) {
    return game.keke.multiplier.multiply(2).multiply(game.upgrade.multiplier3)
  }*/
  let mult = new Decimal(1)
  if (game.keke.kekes.gt(1)) mult = mult.mul(game.keke.multiplier)
  if (game.upgradesPurchased.includes("upgrade2")) mult = mult.mul(2)
  if (game.upgradesPurchased.includes("upgrade3")) mult = mult.mul(game.upgrade.multiplier3)
  return mult
}
//when you get a character, say, keke, this function is the one generating CPS
function addCPS() {
  let totalMultiplier = getTotalMultiplier()
game.cash = game.cash.add(game.cashPerSecond.multiply(totalMultiplier))
}
//end

//how CPC is calculated.
function moreCash() {
if (game.upgradesPurchased.length == 0) {
game.cash = game.cash.add(1)
} else if (game.upgradesPurchased.includes("upgrade1")) {
game.cash = game.cash.add(2)
}
}
//end

//tabs
function showTab(name) {
	const tabs = document.getElementsByClassName("tabbtn");
	for (let tab of tabs) { //The for basically says: "for each tab in tabs do this" - kajfik
    tab.style.display = (tab.id === name) ?  "block" : "none";
    game.tab = name
	}
}
//end

//save
function saveGame() {
  let save = LZString.compressToBase64(JSON.stringify(game))
  window.localStorage.setItem('babamakecash-save', save)
  console.log("Saved game to local storage object 'babamakecash-save'")
}

function copyToClipboard(el) {
  el = (typeof el === "string") ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      var editable = el.contentEditable;
      var readOnly = el.readOnly;
      el.contentEditable = true;
      el.readOnly = true;
      var range = document.createRange();
      range.selectNodeContents(el);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      el.setSelectionRange(0, 999999);
      el.contentEditable = editable;
      el.readOnly = readOnly;
  }
  else {
      el.select();
  }
  document.execCommand("copy");
}

function copyStringToClipboard(str) {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style = {
      position: "absolute",
      left: "-9999px"
    };
    document.body.appendChild(el);
    copyToClipboard(el)
    document.body.removeChild(el);
    alert("Copied to clipboard and placed in the developer Console.")
}


function exportSave() {
  var exportedSave = LZString.compressToBase64(JSON.stringify(game))
  copyStringToClipboard(exportedSave)
  console.log(exportedSave)
}

function importSave() {
  let loadgame=""
  loadgame=LZString.decompressFromBase64(prompt("Paste in your save here.\nWill overwrite your current save!"))
  if (loadgame!="") {
    loadGame(loadgame)
    saveGame()
  }
}

function resetSave() {
 var resetCheck = prompt("are you sure you wish to delete your save? type 'SAVE is DELETE' to delete it!")
if(resetCheck === "SAVE is DELETE") {
localStorage.removeItem("babamakecash-save")
initialize()
} else {
  saveGame()
  return;
}
}
//end

//running functions 
setInterval(update, 10)
setInterval(updateUI, 10)
setInterval(checkIfHighestCanBeIncremented, 10)
setInterval(addCPS, 1000)
setInterval(saveGame, 10000)
