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
    type: any,
    type1: string,
    type2: string,
    pokeFront: string
} = {
    name: "",
    index: "",
    type: "",
    type1: "",
    type2: "",
    pokeFront: ""
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
    col3.innerHTML = "moves";
    let col4 = newRow.insertCell(3);
    if (thisPokemon.type2 != ""){
    col4.innerHTML = thisPokemon.type1+ ", "+ thisPokemon.type2;}
    else {col4.innerHTML = thisPokemon.type1}
    let col5 = newRow.insertCell(4);
    col5.innerHTML = "<img src=\""+ thisPokemon.pokeFront +"\">";
}
function fetchPokemon(name) {
fetch("https://pokeapi.co/api/v2/pokemon/"+ name + "/")
    .then(response => response.json())
    .then(data => {
        thisPokemon.name = data["name"]
        thisPokemon.index = data ["game_indices"]
        let pokeTypes = data["types"]
        //thisPokemon.type1 = pokeTypes[0].type.name
        pokeTypes.forEach((thisPokemonType, i) =>{
            if(i===0){
            thisPokemon.type1 = pokeTypes[i].type.name}
            else{ thisPokemon.type2 = pokeTypes[i].type.name}
            })
        let pokeSprites = data["sprites"];
        thisPokemon.pokeFront = pokeSprites.front_default
        console.log(thisPokemon.index);
        pushFormToTable()
    })
}



