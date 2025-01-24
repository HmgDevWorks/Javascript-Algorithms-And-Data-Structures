const textInput = document.getElementById("search-input");

const pkmnName = document.getElementById("pokemon-name");
const pkmnId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokeImg = document.getElementById("sprite");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const displayPkmn =(data) => {

    pkmnName.textContent = `${data.name.toUpperCase()}`;
    pkmnId.textContent = `#${data.id}`;
    weight.textContent = `${data.weight}`;
    height.textContent = `${data.height}`;
    pokeImg.setAttribute("src", data.sprites.front_default);
    types.innerHTML = '';
    data.types.forEach((t) => {types.innerHTML += `<span id=${t.type.name}>${t.type.name.toUpperCase()}</span>`});

    /* TABLE STATS */
    hp.textContent = data.stats.find(stat => stat.stat.name === "hp").base_stat;
    attack.textContent = data.stats.find(stat => stat.stat.name === "attack").base_stat;
    defense.textContent = data.stats.find(stat => stat.stat.name === "defense").base_stat;
    specialAttack.textContent = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
    specialDefense.textContent = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === "speed").base_stat;
};

const search = async () => {
    if(textInput.value <= 0){
        alert("Pokémon not found");
    }
  let link = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${textInput.value.toLowerCase()}`;

try {
    let response = await fetch(link);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    let data = await response.json();
    displayPkmn(data);
  } catch (err) {
    alert("Pokémon not found");
    //console.log("err", err);
  }
};

const searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", search);