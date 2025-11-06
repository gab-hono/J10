import fs from "fs";
import { findSourceMap } from "module";

let pokedex;

try {
  const data = fs.readFileSync("./pokedex.json", "utf8");
  pokedex = JSON.parse(data);
  console.log("✅ Fichier chargé avec succès !");
} catch (err) {
  console.error("❌ Erreur de lecture du fichier pokedex.json :", err.message);
  process.exit(1);
}

console.log("Nombre de Pokémon :", pokedex.pokemon.length);
console.log("Premier Pokémon :", pokedex.pokemon[0].name);

function countPokemon() {
  return "Le nombre total de Pokémon dans le Pokedex est de : " + pokedex.pokemon.length
}

function heavyPokemon() {
  const heavyDix = pokedex.pokemon
    .filter(i => parseFloat(i.weight) > 10) 
    .map(i => `${i.name} (${i.weight})`);

  return heavyDix;
}

function sortByWeight() {
    const sorted = [...pokedex.pokemon].sort((a, b) => { // [...pokedex.pokemon] crea una copia del array original para no correr el riesgo de modificarlo
    const weightA = parseFloat(a.weight);
    const weightB = parseFloat(b.weight);
    return weightA - weightB;
  });

  sorted.forEach(p => {
    console.log(`${p.name} (${p.weight})`);
  });

  return sorted;
}

function getEvolutions(nameOfPokemon) {
  const findPokemon = pokedex.pokemon.find(p => p.name.toLowerCase() === nameOfPokemon.toLowerCase());
  let pokePrevEvolution;
    if (findPokemon.prev_evolution) {
    pokePrevEvolution = findPokemon.prev_evolution.map(e => e.name);
    } else {
    pokePrevEvolution = [];
    }
  
    let pokeNextEvolution;
      if (findPokemon.next_evolution) {
        pokeNextEvolution = findPokemon.next_evolution.map(e => e.name);
      } else {
        pokeNextEvolution = [];
      }
  return `Évolution précedente : ${pokePrevEvolution}
Évolution suivante : ${pokeNextEvolution}`;
}

function searchPokemon(pokeName) {
    const searchedPokemon = pokedex.pokemon.find(p => p.name.toLowerCase() === pokeName.toLowerCase());
    if (!searchedPokemon) {
      return null
    }
    const evolutionNames = searchedPokemon.next_evolution.map(e => e.name);
    return {
    Nom: searchedPokemon.name,
    Type: searchedPokemon.type.join(", "),
    Taille: searchedPokemon.height,
    Poids: searchedPokemon.weight,
    Évolutions: evolutionNames.join(" → "),
    Faiblesses: searchedPokemon.weaknesses.join(", ")
  };
  }


console.log(countPokemon());
console.log(heavyPokemon().slice (0, 5));
sortByWeight();
console.log(getEvolutions("Bulbasaur"));
console.log(getEvolutions('Mew'));
console.log(searchPokemon("Pikachu"));
console.log(searchPokemon("Bulbasaur"));