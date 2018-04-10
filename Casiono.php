<?php

$onwin = $_POST["onWinButton"];
$onlose = $_POST["onLoseButton"];
$loop = $_POST["loopSelector"];
$bet = $_POST["betAmount"];
$cash = (int)$_POST["cash"];
$spin = $_POST["spin"];
$win = $_POST["win"];
$lose = $_POST["lose"];

$stoploop = false;

if(filter_var($bet,FILTER_VALIDATE_INT) === false || $bet==0) {
    echo "{\"bet\":\"error: NaN\",\"cash\":\"".$cash."\",\"spin\":\"".$spin."\",\"win\":\"".$win."\",\"lose\":\"".$lose."\"}";
    exit();
}

function spin() {
    return mt_rand(1,38)<=18;
}

function calculate($onwin,$onlose,$bet,$cash,$stoploop) {
    if (spin()){
        $cash+=$bet;
        $win = true;

        if($onwin==0) {
            $stoploop = true;
        }
        else {
            $bet *= $onwin;
        }
    }
    else {
        $cash-=$bet;
        $win = false;

        if($onlose==0) {
            $stoploop = true;
        }
        else {
            $bet *= $onlose;
        }
    }

    return array(
        "bet"=>$bet,
        "cash"=>$cash,
        "win"=>$win,
        "stoploop"=>$stoploop,
    );
}




for ($i=0;$i<$loop; $i++) {
    $spinvalue = calculate($onwin,$onlose,$bet,$cash,$stoploop);

    $spin++;

    $cash = (int)$spinvalue["cash"];
    $bet = (int)$spinvalue["bet"];

    if ($spinvalue["win"]) {
        $win++;
    }
    else {
        $lose++;
    }

    if($spinvalue["stoploop"] || $bet==0) {
        break;
    }
}

echo "{\"bet\":\"".$bet."\",\"cash\":\"".$cash."\",\"spin\":\"".$spin."\",\"win\":\"".$win."\",\"lose\":\"".$lose."\"}";
?>

