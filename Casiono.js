/*
David Dada
Casino Simulator
*/

document.write("<figure id='panelWheel'>");
document.write("<img title='click me to spin!' src=\'Resources/wheel1.png\'/>");
document.write("</figure>");

document.write("<div id='panelOptions'>");
document.write("<form id='formOptions' medthod='POST'>");

document.write("<input type='hidden' name='spin'>");
document.write("<input type='hidden' name='win'>");
document.write("<input type='hidden' name='lose'>");
document.write("<input type='hidden' name='cash'>");

document.write("<div class='dropdown'>");
document.write("<button class='dropbtn'>on win</button>");
document.write("<div class='dropdown-content'>");
document.write("<input type='radio' id='option-1win' name='onWinButton' value='0'>");
document.write("<label for='option-1win'>stop</label>");
document.write("<input type='radio' id='option-2win' name='onWinButton' value='.5'>");
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
document.write("<input type='radio' id='option-2loss' name='onLoseButton' value='.5'>");
document.write("<label for='option-2loss'>50%</label>");
document.write("<input type='radio' id='option-3loss' name='onLoseButton' value='1' checked>");
document.write("<label for='option-3loss'>100%</label>");
document.write("<input type='radio' id='option-4loss' name='onLoseButton' value='2'>");
document.write("<label for='option-4loss'>200%</label>");
document.write("</div>");
document.write("</div>");


document.write("<div class='radio-group'>");
document.write("<input type='radio' id='option-one' name='loopSelector' value='1' checked>");
document.write("<label for='option-one'>1x</label>");
document.write("<input type='radio' id='option-two' name='loopSelector' value='10'>");
document.write("<label for='option-two'>10x</label>");
document.write("<input type='radio' id='option-three' name='loopSelector' value='50'>");
document.write("<label for='option-three'>50x</label>");
document.write("</div>");

document.write("<input class='fine' id='betAmount' name='betAmount' type='text' onfocus='this.value=\"\"' value='Bet Amount:'>");

document.write("</form>");
document.write("</div>");

document.write("<div id='panelDisplay'>");
document.write("<div id='currentCash'>$<span id='cash'>100</span></div>");
document.write("<figure id='moneybag'>");
document.write("<img title='click me to reset' src=\'Resources/moneybag.png\'/>");
document.write("</figure>");

document.write("<div id='spinCount'>Spin: <span id='spin'>0</span> Win: <span id='win'>0</span> Lose: <span id='lose'>0</span></div>");
document.write("</div>");

document.getElementById("moneybag").addEventListener("click",resetAll);

//document.getElementById("panelWheel").addEventListener("click",serverCalculate,true);
//document.getElementById("formOptions").addEventListener("submit",serverCalculate,true);

//get objects to send
var cash = document.getElementById("cash");
var spin = document.getElementById("spin");
var win = document.getElementById("win");
var lose = document.getElementById("lose");
var bet = document.getElementById("betAmount");

//set default hidden form values for first submit
document.forms["formOptions"].spin.value = spin.innerHTML;
document.forms["formOptions"].win.value = win.innerHTML;
document.forms["formOptions"].lose.value = lose.innerHTML;
document.forms["formOptions"].cash.value = cash.innerHTML;

function resetAll() {
    cash.innerHTML = 100;
    spin.innerHTML = 0;
    win.innerHTML = 0;
    lose.innerHTML = 0;

    //set form values again. set from the var (could also set from phpReturnObj)
    document.forms["formOptions"].spin.value = spin.innerHTML;
    document.forms["formOptions"].win.value = win.innerHTML;
    document.forms["formOptions"].lose.value = lose.innerHTML;
    document.forms["formOptions"].cash.value = cash.innerHTML;

    //todo: prob better way of setting view and value, so dont have to set twice?
}


function verifyInput(input) {
    if (/[1-9]/.test(""+input.value)) {
        input.className = "valid";
        return true;
    }
    else {
        input.className = "error";
        return false;
    }
}

var xh = new XMLHttpRequest();
xh.onreadystatechange = function() {
    if(xh.status === 200 && xh.readyState === 4) {
        var phpReturnObj = JSON.parse(xh.response);
        //alert("bet:"+phpReturnObj.bet+" cash:"+phpReturnObj.cash+" spin:"+phpReturnObj.spin+" win:"+phpReturnObj.win+" lose:"+phpReturnObj.lose);
        cash.innerHTML = phpReturnObj.cash;
        bet.value = phpReturnObj.bet;
        spin.innerHTML = phpReturnObj.spin;
        win.innerHTML = phpReturnObj.win;
        lose.innerHTML = phpReturnObj.lose;
    }
};

//"click",serverCalculate,true);
document.getElementById("panelWheel").addEventListener("click",function(){
    //document.getElementById('formOptions').submit();
    //todo prevent default when triggered. remove in-declared functions to trigger with click. hidden button for submit?
    });

$(document).ready(function (e){
    $("#formOptions").on('submit',(function(e){
        e.preventDefault();
        $.ajax({
            url: "http://localhost:8888/Casiono/Casiono.php",
            type: "POST",
            data:  new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            success: function(data){
                var phpReturnObj = JSON.parse(data);
                cash.innerHTML = phpReturnObj.cash;
                bet.value = phpReturnObj.bet;
                spin.innerHTML = phpReturnObj.spin;
                win.innerHTML = phpReturnObj.win;
                lose.innerHTML = phpReturnObj.lose;

                //set form values again. set from the var (could also set from phpReturnObj)
                document.forms["formOptions"].spin.value = spin.innerHTML;
                document.forms["formOptions"].win.value = win.innerHTML;
                document.forms["formOptions"].lose.value = lose.innerHTML;
                document.forms["formOptions"].cash.value = cash.innerHTML;
            },
            error: function(){alert("an unexpected error occured");}
        });
    }));
});



//todo: cap bets at x digits. flag max loss payable. desired min/max bets
