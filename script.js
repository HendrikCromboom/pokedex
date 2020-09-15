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
    move: [],
    evo: "",
    evopokeSprites: "",
    evopokeFront: ""
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
    getId("sprite").innerHTML = "<div id=\"noShiny\"><img  src=\"" + thisPokemon.pokeFront + "\"></div>";
    getId("types").innerHTML = thisPokemon.types;
    getId("moves").innerHTML = thisPokemon.move.join("<hr>");
    getId("name").innerHTML = capitalize(thisPokemon.name);
    getId("id").innerHTML = thisPokemon.index + ".";
    getId("shiner").innerHTML = "<div id=\"shiny\"><button id=\"shinyz\" onclick=\"makeShiny()\">Shiny</button></div>";
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
        thisPokemon.types = thisPokemon.type.join("<hr>");
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
        fetch("https://pokeapi.co/api/v2/evolution-chain/" + thisForm.pokeNameOrId + "/")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            thisPokemon.evo = data["chain"]["evolves_to"][0]["species"].name;
            fetch("https://pokeapi.co/api/v2/pokemon/" + thisPokemon.evo + "/")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                thisPokemon.evopokeSprites = data["sprites"];
                console.log(thisPokemon.evopokeSprites);
                thisPokemon.evopokeFront = thisPokemon.evopokeSprites.front_default;
                pushFormToTable();
            });
        });
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
        move: [],
        evo: "",
        evopokeSprites: "",
        evopokeFront: ""
    };
}
function makeShiny() {
    getId("noShiny").innerHTML = "<img id=\"noShiny\" src=\"" + thisPokemon.pokeShiny + "\">";
    getId("shiny").innerHTML = "<button id=\"shinyz\" onclick=\"makeDefault()\">Default</button>";
}
function makeDefault() {
    getId("noShiny").innerHTML = "<img id=\"noShiny\" src=\"" + thisPokemon.pokeFront + "\">";
    getId("shiny").innerHTML = "<button id=\"shinyz\" onclick=\"makeShiny()\">Shiny</button>";
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function addEvoToDex() {
    getId("dex").innerHTML = "<p>" + thisPokemon.evo + "<p><hr><img src=\"" + thisPokemon.evopokeFront + "\">";
}
