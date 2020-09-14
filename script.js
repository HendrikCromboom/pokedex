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
    pokeSprites: "",
    pokeFront: "",
    pokeShiny: "",
    moves: [],
    move: []
};
function formSubmit() {
    resetThisPokemon();
    pullFormData();
    fetchPokemon(thisForm.pokeNameOrId);
    resetValue("pokeNameOrId");
}
function pullFormData() {
    formData("pokeNameOrId");
}
function pushFormToTable() {
    var table = getId("outputTable").getElementsByTagName("tbody")[0];
    table.removeChild(table.getElementsByTagName("tr")[0]);
    var newRow = table.insertRow();
    var col1 = newRow.insertCell(0);
    col1.innerHTML = thisPokemon.index + ".";
    var col2 = newRow.insertCell(1);
    col2.innerHTML = capitalize(thisPokemon.name);
    var col3 = newRow.insertCell(2);
    col3.innerHTML = thisPokemon.move.join("<hr>");
    var col4 = newRow.insertCell(3);
    col4.innerHTML = thisPokemon.types;
    var col5 = newRow.insertCell(4);
    col5.innerHTML = "<div id=\"noShiny\"><img  src=\"" + thisPokemon.pokeFront + "\"></div>";
    var col6 = newRow.insertCell(5);
    col6.innerHTML = "<div id=\"shiny\"><button  onclick=\"makeShiny()\">Shiny</button></div>";
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
        thisPokemon.types = thisPokemon.type.join("<br>");
        thisPokemon.pokeSprites = data["sprites"];
        thisPokemon.pokeFront = thisPokemon.pokeSprites.front_default;
        thisPokemon.pokeShiny = thisPokemon.pokeSprites.front_shiny;
        thisPokemon.moves = data["moves"];
        var moveLength = thisPokemon.moves.length;
        for (var i = 0; i < 4 && i < thisPokemon.moves.length; i++) {
            var randomMoveNum = Math.floor(Math.random() * moveLength);
            thisPokemon.move.push(thisPokemon.moves[randomMoveNum].move.name);
            thisPokemon.moves.splice(randomMoveNum, 1);
        }
        pushFormToTable();
    });
}
function resetThisPokemon() {
    thisPokemon = {
        name: "",
        index: "",
        type: [],
        types: "",
        pokeSprites: [],
        pokeFront: "",
        pokeShiny: "",
        moves: [],
        move: []
    };
}
function makeShiny() {
    getId("noShiny").innerHTML = "<img id=\"noShiny\" src=\"" + thisPokemon.pokeShiny + "\">";
    getId("shiny").innerHTML = "<button id=\"shiny\" onclick=\"makeDefault()\">Default</button>";
}
function makeDefault() {
    getId("noShiny").innerHTML = "<img id=\"noShiny\" src=\"" + thisPokemon.pokeFront + "\">";
    getId("shiny").innerHTML = "<button id=\"shiny\" onclick=\"makeShiny()\">Shiny</button>";
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
