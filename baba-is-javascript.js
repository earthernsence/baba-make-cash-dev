/* global Decimal*/

let game
let keke


  game = {
    cash: new Decimal(0),
    highestCash: new Decimal(0),
    upgradesPurchased: [],
    charactersHired: [],
    cashPerSecond: new Decimal(0),
      keke: {
        kekespushed: 0,
        kekes: new Decimal(0),
        kekeCost: new Decimal(50),
        multiplier: new Decimal(1),
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
      keke: {
        unlocked: false,
        kekespushed: 0,
        kekes: new Decimal(0),
        kekeCost: new Decimal(50),
        multiplier: new Decimal(1),
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
}

function loadGame(loadgame) {
    reset()
    try {
      game = JSON.parse(loadgame)
      unDecimalifySave()
  
      let style = game.keke.unlocked ? "display:block" : "display:none";
      document.getElementById("character1-button").style = style;
      document.getElementById("character1-keketext").style = style;
      document.getElementById("character1-istext").style = style;
      document.getElementById("character1-heretext").style = style;
      document.getElementById("character1").style = style;
      document.getElementsByClassName("kekeInfo1").style = style;
      document.getElementsByClassName("kekeInfo2").style = style;
      update()
      formatShit()
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

function formatShit() {
  document.getElementById("cash_number").textContent = notation.format(game.cash, 2);
  document.getElementById("kekeCost").textContent = notation.format(game.keke.kekeCost, 2);
  document.getElementById("cashstat").textContent = notation.format(game.highestCash, 2);
} // I'm sorry
// this function is entirely redundant i just wanted to have this
formatShit()

function pluralize(word, amount) {
  return amount.eq(1) ? word : (word + "s");
}


function update() {
  document.getElementById("cash_number").innerHTML = game.cash
  document.getElementById("kekeCost").innerHTML = game.keke.kekeCost
  document.getElementById("cashstat").innerHTML = game.highestCash
  document.getElementById("kekeAmount").innerHTML = "You have " + game.keke.kekes + " " +pluralize("Keke", game.keke.kekes)
  document.getElementById("kekeMultiplier").innerHTML = "x" + notation.formatUnder1000(game.keke.multiplier, 2)
  document.getElementById("CPSCount").innerHTML = "you are getting " + notation.format(game.cashPerSecond, 2) + " cash per second"
  formatShit()
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
if (game.cash >= 10) { // for upgrade1
document.getElementById("upgrade1").style="display:block";
document.getElementById("")
} else {
   document.getElementById("upgrade1").style="display:none"
}
//completely removes upgrade1 from showing
  if (game.upgradesPurchased.includes("upgrade1")) {
     document.getElementById("upgrade1").style="display:none"
  }
//kekecharacter show/hide if
if (game.upgradesPurchased.includes("upgrade1") && game.cash >= 10) {
  document.getElementById("character1-button").style="display:block";
  document.getElementById("character1-keketext").style="display:block";
  document.getElementById("character1-istext").style="display:block";
  document.getElementById("character1-heretext").style="display:block";
  document.getElementById("character1").style="display:block";
  document.getElementsByClassName("kekeInfo1").style = "display:block"
  document.getElementsByClassName("kekeInfo2").style = "display:block"
  game.keke.unlocked = true
}
if (game.charactersHired.includes("keke")) { //keeps keke showing no matter what
  document.getElementById("character1-button").style="display:block";
  document.getElementById("character1-keketext").style="display:block";
  document.getElementById("character1-istext").style="display:none";
  document.getElementById("character1-heretext").style="display:none";
  document.getElementById("character1").style="display:block";
  document.getElementsByClassName("kekeInfo1").style = "display:block"
  document.getElementsByClassName("kekeInfo2").style = "display:block"
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
document.getElementById("upgrade1").style="display:none";
}
}
//end

//how characters are hired
function hireKeke() { //keke hiring
  if (game.cash.gte(game.keke.kekeCost)) {
    if (game.keke.kekespushed < 1) {
      game.charactersHired.push('keke'); //same reason as upgradesPurchased
      game.keke.kekespushed += 1
    }
    if (game.keke.kekespushed == 1) {
      game.cash = game.cash.minus(game.keke.kekeCost);
      game.keke.kekeCost = game.keke.kekeCost.multiply(1.25).floor();
      document.getElementById("kekeCost").innerHTML = game.keke.kekeCost
      game.cashPerSecond = game.cashPerSecond.add(2.5 * game.keke.multiplier);
      game.keke.kekes = game.keke.kekes.add(1)
      game.keke.multiplier = game.keke.multiplier.multiply(1.1)
    }
  }
}
//end

//when you get a character, say, keke, this function is the one generating CPS
function addCPS() {
game.cash = game.cash.add(game.cashPerSecond)
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
setInterval(checkIfCanShowThings, 10)
setInterval(checkIfHighestCanBeIncremented, 10)
setInterval(addCPS, 1000)
setInterval(saveGame, 10000)
