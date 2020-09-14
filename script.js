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
    type: "",
    type1: "",
    type2: "",
    pokeFront: ""
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
    col3.innerHTML = "moves";
    var col4 = newRow.insertCell(3);
    if (thisPokemon.type2 != "") {
        col4.innerHTML = thisPokemon.type1 + ", " + thisPokemon.type2;
    }
    else {
        col4.innerHTML = thisPokemon.type1;
    }
    var col5 = newRow.insertCell(4);
    col5.innerHTML = "<img src=\"" + thisPokemon.pokeFront + "\">";
}
function fetchPokemon(name) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + name + "/")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        thisPokemon.name = data["name"];
        thisPokemon.index = data["game_indices"];
        var pokeTypes = data["types"];
        //thisPokemon.type1 = pokeTypes[0].type.name
        pokeTypes.forEach(function (thisPokemonType, i) {
            if (i === 0) {
                thisPokemon.type1 = pokeTypes[i].type.name;
            }
            else {
                thisPokemon.type2 = pokeTypes[i].type.name;
            }
        });
        var pokeSprites = data["sprites"];
        thisPokemon.pokeFront = pokeSprites.front_default;
        console.log(thisPokemon.index);
        pushFormToTable();
    });
}
