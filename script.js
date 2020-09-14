function getId(id) { return document.getElementById(id); }
function returnValue(id) { return getId(id).value; }
function resetValue(id) { getId(id).value = ""; }
function formData(id) { return thisForm[id] = returnValue(id); }
var thisForm = {
    pokeNameOrId: ""
};
var thisPokemon = {
    name: "",
    index: "",
    type: [],
    types: "",
    pokeFront: "",
    pokeShiny: "",
    moves: [],
    move: []
};
function formSubmit() {
    pullFormData();
    fetchPokemon(thisForm.pokeNameOrId);
    resetValue("pokeNameOrId");
}
function pullFormData() {
    formData("pokeNameOrId");
}
function pushFormToTable() {
    var table = getId("outputTable").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow();
    var col1 = newRow.insertCell(0);
    col1.innerHTML = thisPokemon.name;
    var col2 = newRow.insertCell(1);
    col2.innerHTML = thisPokemon.index;
    var col3 = newRow.insertCell(2);
    col3.innerHTML = thisPokemon.move.join(", ");
    var col4 = newRow.insertCell(3);
    col4.innerHTML = thisPokemon.types;
    var col5 = newRow.insertCell(4);
    col5.innerHTML = "<img id=\"noShiny\" src=\"" + thisPokemon.pokeFront + "\">";
    var col6 = newRow.insertCell(5);
    col6.innerHTML = "<button id=\"shiny\">Shiny</button>";
    resetThisPokemon();
}
function fetchPokemon(name) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + name + "/")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        thisPokemon.name = data["name"];
        thisPokemon.index = data["id"];
        var pokeTypes = data["types"];
        pokeTypes.forEach(function (types) {
            thisPokemon.type.push(types.type.name);
        });
        thisPokemon.types = thisPokemon.type.join(", ");
        var pokeSprites = data["sprites"];
        thisPokemon.pokeFront = pokeSprites.front_default;
        thisPokemon.moves = data["moves"];
        var moveLength = thisPokemon.moves.length;
        for (var i = 0; i < 4 && i < thisPokemon.moves.length; i++) {
            var randomMoveNum = Math.floor(Math.random() * moveLength);
            thisPokemon.move.push(thisPokemon.moves[randomMoveNum].move.name);
            thisPokemon.moves.splice(randomMoveNum, 1);
        }
        thisPokemon.pokeShiny = data["front_shiny"];
        pushFormToTable();
    });
}
function resetThisPokemon() {
    thisPokemon = {
        name: "",
        index: "",
        type: [],
        types: "",
        pokeFront: "",
        pokeShiny: "",
        moves: [],
        move: []
    };
}
getId("shiny").addEventListener("click", function () {
    getId("noShiny").innerHTML = thisPokemon.pokeShiny;
});
