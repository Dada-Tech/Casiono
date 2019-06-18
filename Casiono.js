/*
David Dada
Roulette Simulator
*/

var MAX_BET = 400;
var MIN_BET = 0;
var CASH_ADD = 100;
var CASH_DEFAULT = 300;

document.write("<figure id='panelWheel'>");
document.write("<img title='click me to spin!' src=\'Resources/wheel1.png\'/>");
document.write("</figure>");

document.write("<div id='panelOptions'>");
document.write("<form id='formOptions'>");

document.write("<div class='dropdown'>");
document.write("<button class='dropbtn'>on win</button>");
document.write("<div class='dropdown-content'>");
document.write("<input type='radio' id='option-1win' name='onWinButton' value='0'>");
document.write("<label for='option-1win'>stop</label>");
document.write("<input type='radio' id='option-2win' name='onWinButton' value='0.5'>");
document.write("<label for='option-2win'>50%</label>");
document.write("<input type='radio' id='option-3win' name='onWinButton' value='1' checked>");
document.write("<label for='option-3win'>100%</label>");
document.write("<input type='radio' id='option-4win' name='onWinButton' value='2'>");
document.write("<label for='option-4win'>200%</label>");
document.write("</div>");
document.write("</div>");

document.write("<div class='dropdown'>");
document.write("<button class='dropbtn'>on loss</button>");
document.write("<div class='dropdown-content'>");
document.write("<input type='radio' id='option-1loss' name='onLoseButton' value='0'>");
document.write("<label for='option-1loss'>stop</label>");
document.write("<input type='radio' id='option-2loss' name='onLoseButton' value='0.5'>");
document.write("<label for='option-2loss'>50%</label>");
document.write("<input type='radio' id='option-3loss' name='onLoseButton' value='1' checked>");
document.write("<label for='option-3loss'>100%</label>");
document.write("<input type='radio' id='option-4loss' name='onLoseButton' value='2'>");
document.write("<label for='option-4loss'>200%</label>");
document.write("</div>");
document.write("</div>");

document.write("<input type='button' id='resetButton' class='dropbtn' value='reset'/>");

document.write("<div class='radio-group'>");
document.write("<input type='radio' id='option-one' name='loopSelector' value='1' checked>");
document.write("<label for='option-one'>1x</label>");
document.write("<input type='radio' id='option-two' name='loopSelector' value='10'>");
document.write("<label for='option-two'>10x</label>");
document.write("<input type='radio' id='option-three' name='loopSelector' value='50'>");
document.write("<label for='option-three'>50x</label>");
document.write("</div>");

document.write("<input class='fine' id='betAmount' name='betAmount' type='text' onfocus='this.value=\"\"' value='0' placeholder='Bet Amount:'>");

document.write("</form>");
document.write("</div>");


document.write("<div id='panelDisplay'>");
document.write("<div id='currentCash'>$<span id='cash'>"+CASH_DEFAULT+"</span></div>");
document.write("<figure id='moneybag'>");
document.write("<img title='click me to add cash' alt='click to reset' src=\'Resources/moneybag.png\'/>");
document.write("</figure>");

document.write("<div id='spinCount'>Spin: <span id='spin'>0</span> Win: <span id='win'>0</span> Lose: <span id='lose'>0</span></div>");
document.write("</div>");

document.getElementById("moneybag").addEventListener("click",addMoney);
document.getElementById("panelWheel").addEventListener("click",calculateSpin);
document.getElementById("resetButton").addEventListener("click",resetAll);

//get objects to send
var spin = document.querySelector("#spin");
var win = document.querySelector("#win");
var lose = document.querySelector("#lose");
var bet = document.querySelector('#betAmount');
var cash = document.querySelector("#cash");


$( "#formOptions" ).submit(function( event ) {
    event.preventDefault();
    if(verifyCustomInput(bet)){
        calculateSpin();
    }
});

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

    //console.log({onwin_i,onlose_i,loop_i,spin_i,win_i,lose_i,bet_i,cash_i,stoploop_i});

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



// -- Events
document.getElementById("panelWheel").addEventListener("click",function(){
    //document.getElementById('formOptions').submit();
    //todo prevent default when triggered. remove in-declared functions to trigger with click. hidden button for submit?
});


// -- functions

function resetAll() {
    cash.innerHTML = CASH_DEFAULT;
    spin.innerHTML = 0;
    win.innerHTML = 0;
    lose.innerHTML = 0;
    //todo: prob better way of setting view and value, so dont have to set twice?
}

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