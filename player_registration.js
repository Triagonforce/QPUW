const playerslist = [];

const node = document.getElementsByClassName("player_input")[0];
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        var name = node.value;
        playerslist.push(name);
        console.log(playerslist);
        node.value = "";
        var newName = document.createElement("li");
        newName.className = "playername"
        newName.innerHTML = name;
        document.getElementById("player_names_inner").appendChild(newName);
    }
});

function startGame() {
    console.log(playerslist);
    window.location.href = './neufpoints.html?players='+playerslist;
}