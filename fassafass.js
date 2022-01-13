const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const playernames = params.players.split(',');
const playerscores = {};

var maxScore = 12;
const refreshRate = 50;
const times = [3,5,7,9]
var currentTimes = [];
var time = 0;
var playing = false;
var step = 4;

createPlayer(playernames[0], true);
createPlayer(playernames[1], false);

playernames.forEach(n => {
    playerscores[n] = 0;
});

function createPlayer(playername, before) {
    var playerdiv = document.createElement("div");
    playerdiv.className = "fassafass_player";

    var namecontainer = document.createElement("div");
    namecontainer.className = "fassafass_playername_container";

    var name = document.createElement("div");
    name.className = "fassafass_playername";
    name.innerHTML = playername

    namecontainer.appendChild(name);

    var progress = document.createElement("div");
    progress.className = "fassafass_progress";
    progress.id = "progress_" + playername;

    var score = document.createElement("div");
    score.className = "fassafass_playerscore";
    score.id = "score_" + playername;
    score.innerHTML = "0";
    
    var manobutton = document.createElement("button");
    manobutton.id = "mano_" + playername;
    manobutton.innerHTML = "la mano";

    manobutton.onclick = function() {
        setMano(playername);
    }

    var goodbutton = document.createElement("button");
    goodbutton.id = "good_" + playername;
    goodbutton.innerHTML = "SEEEEEEIIIIIKAI";

    goodbutton.onclick = function() {
        playerscores[playernames[0]] += step;
        refreshProgress();
    }

    var badbutton = document.createElement("button");
    badbutton.id = "bad_" + playername;
    badbutton.innerHTML = "No no no.";

    badbutton.onclick = function() {
        loseMano(step, playername);
    }

    playerdiv.appendChild(namecontainer);
    playerdiv.appendChild(progress);
    playerdiv.appendChild(score);
    playerdiv.appendChild(manobutton);
    playerdiv.appendChild(goodbutton);
    playerdiv.appendChild(badbutton);

    var central = document.getElementById("fassafass_central_area");

    if (before) {
        central.parentNode.insertBefore(playerdiv, central);
    } else {
        central.parentNode.insertBefore(playerdiv, central.nextSibling);
    }
}

function setMano(playername) {
    const mult = playernames[0] == playername ? 1 : -1;

    document.getElementById("fassafass_central_4").style['margin-right'] = (mult*20) + 'px';
    document.getElementById("fassafass_central_3").style['margin-right'] = (mult*-20) + 'px';
    document.getElementById("fassafass_central_2").style['margin-right'] = (mult*20) + 'px';
    document.getElementById("fassafass_central_1").style['margin-right'] = (mult*-20) + 'px';
}

function loseMano(s, playername) {
    const mult = playernames[0] == playername ? -1 : 1;

    document.getElementById("fassafass_central_"+step).style['margin-right'] = (mult*20) + 'px';
}

setInterval(timerfunction, refreshRate);

function timerfunction() {
    if (playing) {
       time ++;

       currentTimes[step-1] += refreshRate/1000

       var gradientPercent = (currentTimes[step-1] / times[step-1]) * 100;
       updateElementPercentage('fassafass_central_' + step, gradientPercent);

       if (currentTimes[step-1] >= times[step-1]) {
           step --;
       }
        
        if (step == 0) {
            playing = false;
        }
    } 
}

function updateElementPercentage(element, percentage) {
    document.getElementById(element).style['background-image'] = 'linear-gradient(to bottom, rgba(0,0,0,0) '+percentage+'%, orange 0%)';
}

function resetValues() {
    currentTimes = [];
    times.forEach(t => {
        currentTimes.push(0);
    })
    step = 4;
    time = 0;
    for (var i = 1; i <= 4; i++) {
        updateElementPercentage('fassafass_central_' + i, 0);
    }
}

function startGame() {
    resetValues();
    playing = true;
}

function pause() {
    playing = !playing;
}

document.onkeydown = checkKey;

function checkKey(e) {
    console.log(e.keyCode);
    if (e.keyCode == 17) {
        pause();
    } else if (e.keyCode == 37) {
        playerscores[playernames[0]] += step;
        refreshProgress();
    } else if (e.keyCode == 39) {
        playerscores[playernames[1]] += step;
        refreshProgress()
    }
}

function refreshProgress() {
    console.log(playerscores)
    updateElementPercentage("progress_"+playernames[0], 100 - (playerscores[playernames[0]] / maxScore) * 100);
    updateElementPercentage("progress_"+playernames[1], 100 - (playerscores[playernames[1]] / maxScore) * 100);
    document.getElementById("score_"+playernames[0]).innerHTML = playerscores[playernames[0]];
    document.getElementById("score_"+playernames[1]).innerHTML = playerscores[playernames[1]];
}