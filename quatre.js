const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const playernames = params.players.split(',');

const playerscores = {};

var timeout = 0;

const seconds = 30;

var focusedplayer = "";
var playing = false;

playernames.forEach(n => {
    createPlayer(n);
    playerscores[n] = 0;
})

focusPlayerFirstPoint();

function createPlayer(playername) {
    var playerdiv = document.createElement("div");
    playerdiv.className = "quatre_player";
    playerdiv.id = playername + "-player";

    var pointsdiv = document.createElement("ul");
    pointsdiv.className = "quatre_points";
    pointsdiv.id = playername + "-points";

    for (var i = 0; i < 5; i++) {
        pointsdiv.appendChild(createPointElement(i, playername));
    }

    var namecontainer = document.createElement("div");
    namecontainer.className = "quatre_playername_container";

    var name = document.createElement("div");
    name.className = "quatre_playername";
    name.innerHTML = playername;


    var btncontainer = document.createElement("div");
    btncontainer.className = "neufpoints_playerscore_btns";

    var btnup = document.createElement("button");
    btnup.className = "neufpoints_playerscore_btnup";
    btnup.innerHTML = "I choose you !";
    btnup.onclick = function() {
        Array.prototype.forEach.call(document.getElementsByClassName("focusedplayer"), function(e) {
            e.classList.remove("focusedplayer");
        });
        document.getElementById(playername+"-player").classList.add("focusedplayer");
        focusedplayer = playername;
        playing = true;
        timeout = seconds;
    }

    btncontainer.appendChild(btnup);

    namecontainer.appendChild(name);
    playerdiv.appendChild(namecontainer);
    playerdiv.appendChild(pointsdiv);
    playerdiv.appendChild(btncontainer);

    document.getElementById("quatre_playersarea").appendChild(playerdiv);
}

function createPointElement(i, p) {
    var pointElement = document.createElement("li");
    pointElement.className = "quatre_point";
    pointElement.id = p + "-" + i + "-point";
    
    const cars = ["〇","一","二","三","四"];
    pointElement.innerHTML = cars[i];

    return pointElement;
}

function focusPlayerFirstPoint() {
    playernames.forEach(p => {
        document.getElementById(p+"-0-point").classList.add("focusedpoint");
    });
}

document.onkeydown = checkKey;

function checkKey(e) {
    if (e.keyCode == '38') {
        if (playerscores[focusedplayer] < 4) {
            document.getElementById(focusedplayer+"-"+playerscores[focusedplayer]+"-point").classList.remove("focusedpoint");
            playerscores[focusedplayer] += 1;
            document.getElementById(focusedplayer+"-"+playerscores[focusedplayer]+"-point").classList.add("focusedpoint");
            if (playerscores[focusedplayer] == 4) {
                playing = false;
                step = 0;
                timeout = 0;
            }
        }
    } else if (e.keyCode == '40') {
        document.getElementById(focusedplayer+"-"+playerscores[focusedplayer]+"-point").classList.remove("focusedpoint");
        document.getElementById(focusedplayer+"-0-point").classList.add("focusedpoint");
        playerscores[focusedplayer] = 0;
    }
}

function end() {
    p = [];
    ps = [];
    playernames.forEach((pl) => {
        p.push(pl);
        ps.push(playerscores[pl]);
    })
    window.location.href = './fassafass.html?players='+p.filter(a => playerscores[a] > Math.min(...ps));
}

var step = 0;
const refreshRate = 50;
setInterval(timerfunction, refreshRate);

function timerfunction() {
    if (playing) {
        if (step == 0 && timeout == seconds) {
            document.getElementById("quatre_progress").style["width"] = "100%";
        }
        step ++;
        if (step == 1000/refreshRate) {
            timeout --;
            step = 0;
            if (timeout == 0) {
                playing = false;
            }
        }
    }
    document.getElementById("quatre_timeout").innerHTML = timeout;
    document.getElementById("quatre_progress").style["width"] = 100-((((seconds-timeout)*(1000/refreshRate)+step)/(seconds*(1000/refreshRate)))*100) + "%";
}