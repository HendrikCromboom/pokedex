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
    pokeFront: string,
    pokeShiny: string,
    moves: any[],
    move: string[]
} = {
    name: "",
    index: "",
    type: [],
    types: "",
    pokeFront: "",
    pokeShiny: "",
    moves: [],
    move: []
}

function formSubmit(){
    pullFormData()
    fetchPokemon(thisForm.pokeNameOrId)
    resetValue("pokeNameOrId")

}
function pullFormData(){
    formData("pokeNameOrId");
}
function pushFormToTable(){
    let table = getId("outputTable").getElementsByTagName("tbody")[0];
    let newRow = (<HTMLTableSectionElement>table).insertRow()
    let col1 = newRow.insertCell(0);
    col1.innerHTML = thisPokemon.name;
    let col2 = newRow.insertCell(1);
    col2.innerHTML = thisPokemon.index;
    let col3 = newRow.insertCell(2);
    col3.innerHTML = thisPokemon.move.join(", ");
    let col4 = newRow.insertCell(3);
    col4.innerHTML = thisPokemon.types
    let col5 = newRow.insertCell(4);
    col5.innerHTML = "<img id=\"noShiny\" src=\""+ thisPokemon.pokeFront +"\">";
    let col6 = newRow.insertCell(5);
    col6.innerHTML = "<button id=\"shiny\">Shiny</button>";
    resetThisPokemon();
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
            thisPokemon.types = thisPokemon.type.join(", ")
            let pokeSprites = data["sprites"];
            thisPokemon.pokeFront = pokeSprites.front_default
            thisPokemon.moves = data["moves"]
            let moveLength = thisPokemon.moves.length
            for (let i = 0; i < 4 && i < thisPokemon.moves.length; i++) {
                let randomMoveNum = Math.floor(Math.random()*moveLength)
                thisPokemon.move.push(thisPokemon.moves[randomMoveNum].move.name);
                thisPokemon.moves.splice(randomMoveNum, 1);
            }
            thisPokemon.pokeShiny = data ["front_shiny"]
            pushFormToTable()
            })
        }

function resetThisPokemon(){
    thisPokemon ={
        name: "",
        index: "",
        type: [],
        types: "",
        pokeFront: "",
        pokeShiny: "",
        moves: [],
        move: []
    }
}
getId("shiny").addEventListener("click",function(){
    getId("noShiny").innerHTML = thisPokemon.pokeShiny
} )