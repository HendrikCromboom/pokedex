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
    getId("sprite").innerHTML = "<div id=\"noShiny\"><img  src=\""+ thisPokemon.pokeFront +"\"></div>";
    getId("types").innerHTML = thisPokemon.types;
    getId("moves").innerHTML = thisPokemon.move.join("<hr>");
    getId("name").innerHTML = capitalize(thisPokemon.name);
    getId("id").innerHTML = thisPokemon.index+ ".";
    getId("shiner").innerHTML = "<div id=\"shiny\"><button id=\"shinyz\" onclick=\"makeShiny()\">Shiny</button></div>";
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
            thisPokemon.types = thisPokemon.type.join("<hr>")
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
        getId("shiny").innerHTML = "<button id=\"shinyz\" onclick=\"makeDefault()\">Default</button>";
}
function makeDefault(){
    getId("noShiny").innerHTML = "<img id=\"noShiny\" src=\""+ thisPokemon.pokeFront +"\">"
    getId("shiny").innerHTML = "<button id=\"shinyz\" onclick=\"makeShiny()\">Shiny</button>";
}

function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}