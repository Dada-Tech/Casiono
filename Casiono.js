/*
David Dada
Roulette Simulator
*/

var MAX_BET = 400;
var MIN_BET = 0;
var CASH_ADD = 100; //how much cash to top by up when needed
var CASH_DEFAULT = 300; //default cash to start with


//get objects
var spin = document.querySelector("#spin");
var win = document.querySelector("#win");
var lose = document.querySelector("#lose");
var bet = document.querySelector('#betAmount');
var cash = document.querySelector("#cash");
cash.innerHTML = CASH_DEFAULT;

//events
document.getElementById("moneybag").addEventListener("click",addMoney);
document.getElementById("panelWheel").addEventListener("click",calculateSpin);
document.getElementById("resetButton").addEventListener("click",resetAll);
bet.addEventListener("focus",function(){this.value=""});

//Submit
$( "#formOptions" ).submit(function( event ) {
    event.preventDefault();
    if(verifyCustomInput(bet)){
        calculateSpin();
    }
});

//Roulette random outcome for Red/Black
function rouletteBlackRed() {
    return Math.floor(Math.random() * 100)<47;
}


function calculateSpin() {
    var onwin_i = parseFloat(document.querySelector('input[name="onWinButton"]:checked').value);
    var onlose_i = parseFloat(document.querySelector('input[name="onLoseButton"]:checked').value);
    var loop_i = parseInt(document.querySelector('input[name="loopSelector"]:checked').value);
    var spin_i = parseInt(spin.innerHTML);
    var win_i = parseInt(win.innerHTML);
    var lose_i = parseInt(lose.innerHTML);
    var bet_i = parseInt(bet.value);
    var cash_i = parseInt(cash.innerHTML);

    var stoploop_i = false;

    if(bet_i>MAX_BET){
        bet_i = MAX_BET;
        bet.value = MAX_BET;
    }
    if (bet_i<MIN_BET){
        bet_i = MIN_BET;
        bet.value = MIN_BET;
    }

    //calculate a single spin, update spin win loss cash
    function singleSpin() {
        if((bet_i>cash_i) || (bet_i===0)){
            bet.className="error";
            stoploop_i = true;
            return stoploop_i;
        }

        spin_i++;
        if (rouletteBlackRed()){
            cash_i+=bet_i;
            win_i++;

            if(onwin_i===0) {
                stoploop_i = true;
            }
            else {
                bet_i = Math.floor(bet_i * onwin_i);
            }
        }
        else {
            cash_i-=bet_i;
            lose_i++;

            if(onlose_i===0) {
                stoploop_i = true;
            }
            else {
                bet_i = Math.floor(bet_i * onlose_i);
            }
        }
        return stoploop_i;
    }

    for (var i=0;i<loop_i;i++) {
        if(singleSpin()){
            break;
        }
    }

    //update global vars
    spin.innerHTML = spin_i;
    win.innerHTML = win_i;
    lose.innerHTML = lose_i;
    bet.value = bet_i;
    cash.innerHTML = cash_i;
}

// -- functions

function resetAll() {
    cash.innerHTML = CASH_DEFAULT;
    spin.innerHTML = 0;
    win.innerHTML = 0;
    lose.innerHTML = 0;
    //todo: prob better way of setting view and value, so dont have to set twice?
}

//incrementally add money to purse
function addMoney() {
    cash.innerHTML = parseInt(cash.innerHTML) + CASH_ADD;
}

//input validation: numbers only
function verifyCustomInput(input) {
    if (/^[0-9]*$/.test(""+input.value) && (input.value!=="")){
        input.className = "valid";
        return true;
    }
    else {
        input.className = "error";
        input.value = "";
        return false;
    }
}