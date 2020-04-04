/* global Decimal*/

let game

function reset() {
  
  game = {
    cash: new Decimal(0),
    totalCash: new Decimal(0),
    upgradesPurchased: [],
    kekeCost: new Decimal(50),
    charactersHired: [],
    cashPerSecond: new Decimal(0),
    kekes: new Decimal(0)
  }
  development = {
    kekespushed: 0
  }
}

reset()

function update() {
  document.getElementById("cash_number").innerHTML = game.cash
  document.getElementById("kekeCost").innerHTML = game.kekeCost
  document.getElementById("cashstat").innerHTML = game.totalCash
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

//defining upgrades showing as none or some
function checkIfCanShowThings() {
if (game.cash >= 10) { // for upgrade1
document.getElementById("upgrade1").style="display:block";
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
}
if (game.charactersHired.includes("keke")) { //keeps keke showing no matter what
  document.getElementById("character1-button").style="display:block";
  document.getElementById("character1-keketext").style="display:block";
  document.getElementById("character1-istext").style="display:none";
  document.getElementById("character1-heretext").style="display:none";
  document.getElementById("character1").style="display:block";
}
}
//end 

//for highest ever cash
function checkIfTotalCanBeIncremented() {
  if (game.totalCash < game.cash) {
    game.totalCash = game.cash
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
  if (game.cash >= game.kekeCost) {
if (development.kekespushed < 1) {
game.charactersHired.push('keke'); //same reason as upgradesPurchased
development.kekespushed = development.kekespushed + 1
}
    if (development.kekespushed == 1) {
  game.cash = game.cash.minus(game.kekeCost);
  game.kekeCost = game.kekeCost.multiply(1.25).floor();
  document.getElementById("kekeCost").innerHTML = game.kekeCost
  game.cashPerSecond = game.cashPerSecond.add(2.5);
  game.kekes = game.kekes.add(1)
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

function showTab(name) {
	const tabs = document.getElementsByClassName("tab");
	for (let tab of tabs) { //The for basically says: "for each tab in tabs do this" - kajfik
		tab.style.display = (tab.id === name) ?  "block" : "none";
	}
}
//running functions 
setInterval(update, 10)
setInterval(checkIfCanShowThings, 10)
setInterval(checkIfTotalCanBeIncremented, 10)
setInterval(addCPS, 1000)
