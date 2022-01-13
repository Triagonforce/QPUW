const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const playernames = params.players.split(',');

const playerscores = {};

playernames.forEach(n => {
    createPlayer(n);
    playerscores[n] = 0;
})

function createPlayer(playername) {
    var playerdiv = document.createElement("div");
    playerdiv.className = "neufpoints_player";

    var pointsdiv = document.createElement("ul");
    pointsdiv.className = "neufpoints_points";
    pointsdiv.id = playername + "-points";


    var scorecontainer = document.createElement("div");
    scorecontainer.className = "neufpoints_playerscore_container";

    var score = document.createElement("div");
    score.className = "neufpoints_playerscore";
    score.id = playername + "-score"
    score.innerHTML = "〇";

    scorecontainer.appendChild(score);


    var namecontainer = document.createElement("div");
    namecontainer.className = "neufpoints_playername_container";

    var name = document.createElement("div");
    name.className = "neufpoints_playername";
    name.innerHTML = playername

    namecontainer.appendChild(name);


    var btncontainer = document.createElement("div");
    btncontainer.className = "neufpoints_playerscore_btns";

    var btnup = document.createElement("button");
    btnup.className = "neufpoints_playerscore_btnup";
    btnup.innerHTML = "上";

    btnup.onclick = function() { 
        if (playerscores[playername] < 9) {
            playerscores[playername] ++;
            var point = document.createElement("li");
            point.className = "neufpoints_point";
            document.getElementById(playername+"-points").appendChild(point);
            updateScore(playername);
        }
    }

    var btndown = document.createElement("button");
    btndown.className = "neufpoints_playerscore_btndown";
    btndown.innerHTML = "下";

    btndown.onclick = function() { 
        if (playerscores[playername] > 0) {
            playerscores[playername] --;
            var ul = document.getElementById(playername+"-points");
            ul.removeChild(ul.getElementsByTagName("li")[0]);
            updateScore(playername);
        }
    }

    btncontainer.appendChild(btnup);
    btncontainer.appendChild(btndown);


    playerdiv.appendChild(pointsdiv);
    playerdiv.appendChild(scorecontainer);
    playerdiv.appendChild(namecontainer);
    playerdiv.appendChild(btncontainer);

    document.getElementById("neufpoints_playersarea").appendChild(playerdiv);
}

function updateScore(playername) {
    const cars = ["〇","一","二","三","四","五","六","七","八","九"];
    document.getElementById(playername+"-score").innerHTML = cars[playerscores[playername]];
}

function end() {
    p = []
    playernames.forEach((pl) => {
        if (playerscores[pl] == 9){
            p.push(pl);
        }
    })
    window.location.href = './quatreallahsuite.html?players='+p;
}