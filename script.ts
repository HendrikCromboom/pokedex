function getId(id){ return document.getElementById(id)}
function returnValue(id){ return (<HTMLInputElement>getId(id)).value}
function resetValue(id){(<HTMLInputElement>getId(id)).value = ""}
function formData(id){ return thisForm[id] = returnValue(id)}
let thisForm:{
    pokeNameOrId: string,

} = {
    pokeNameOrId: ""
};
let thisPokemon:{
    name: string,
    index: string,
    type: string[],
    types: string,
    pokeSprites: any,
    pokeFront: string,
    pokeShiny: string,
    moves: any[],
    move: string[]
} = {
    name: "",
    index: "",
    type: [],
    types: "",
    pokeSprites: "",
    pokeFront: "",
    pokeShiny: "",
    moves: [],
    move: []
}

function formSubmit(){
    resetThisPokemon()
    pullFormData()
    fetchPokemon(thisForm.pokeNameOrId)
    resetValue("pokeNameOrId")

}
function pullFormData(){
    formData("pokeNameOrId");
}
function pushFormToTable(){
    let table = getId("outputTable").getElementsByTagName("tbody")[0];
    table.removeChild(table.getElementsByTagName("tr")[0])
    let newRow = (<HTMLTableSectionElement>table).insertRow()
    let col1 = newRow.insertCell(0);
    col1.innerHTML = thisPokemon.index+ ".";
    let col2 = newRow.insertCell(1);
    col2.innerHTML = capitalize(thisPokemon.name);
    let col3 = newRow.insertCell(2);
    col3.innerHTML = thisPokemon.move.join("<hr>");
    let col4 = newRow.insertCell(3);
    col4.innerHTML = thisPokemon.types
    let col5 = newRow.insertCell(4);
    col5.innerHTML = "<div id=\"noShiny\"><img  src=\""+ thisPokemon.pokeFront +"\"></div>";
    let col6 = newRow.insertCell(5);
    col6.innerHTML = "<div id=\"shiny\"><button  onclick=\"makeShiny()\">Shiny</button></div>";
}
function fetchPokemon(name) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + name + "/")
        .then(response => response.json())
        .then(data => {
            thisPokemon.name = data["name"]
            thisPokemon.index = data ["id"]
            let pokeTypes = data["types"]
            pokeTypes.forEach((types) => {
                thisPokemon.type.push(types.type.name)})
            thisPokemon.types = thisPokemon.type.join("<br>")
            thisPokemon.pokeSprites = data["sprites"];
            thisPokemon.pokeFront = thisPokemon.pokeSprites.front_default
            thisPokemon.pokeShiny = thisPokemon.pokeSprites.front_shiny
            thisPokemon.moves = data["moves"]
            let moveLength = thisPokemon.moves.length
            for (let i = 0; i < 4 && i < thisPokemon.moves.length; i++) {
                let randomMoveNum = Math.floor(Math.random()*moveLength)
                thisPokemon.move.push(thisPokemon.moves[randomMoveNum].move.name);
                thisPokemon.moves.splice(randomMoveNum, 1);
            }
            pushFormToTable()
            })
        }

function resetThisPokemon(){
    thisPokemon ={
        name: "",
        index: "",
        type: [],
        types: "",
        pokeSprites: [],
        pokeFront: "",
        pokeShiny: "",
        moves: [],
        move: []
    }
}

    function makeShiny(){
    getId("noShiny").innerHTML = "<img id=\"noShiny\" src=\""+ thisPokemon.pokeShiny +"\">"
        getId("shiny").innerHTML = "<button id=\"shiny\" onclick=\"makeDefault()\">Default</button>";
}
function makeDefault(){
    getId("noShiny").innerHTML = "<img id=\"noShiny\" src=\""+ thisPokemon.pokeFront +"\">"
    getId("shiny").innerHTML = "<button id=\"shiny\" onclick=\"makeShiny()\">Shiny</button>";
}

function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}