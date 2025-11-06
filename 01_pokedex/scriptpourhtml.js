let pokedex;

fetch("pokedex.json")
  .then(response => response.json())
  .then(data => {
    pokedex = data;
    console.log("✅ Pokedex chargé !");

    const searchButton = document.getElementById("search-button");
    const inputField = document.getElementById("pokemon-input");

    searchButton.addEventListener("click", () => {
      displayPokemonInfo(inputField.value.trim());
    });

    inputField.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        displayPokemonInfo(inputField.value.trim());
      }
    });
  })
  .catch(err => console.error("❌ Erreur:", err));

function searchPokemon(name) {
  const searchedPokemon = pokedex.pokemon.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!searchedPokemon) return null;

  const nextEvol = searchedPokemon.next_evolution ? searchedPokemon.next_evolution.map(e => e.name).join(" → ") : "Aucune";
  const prevEvol = searchedPokemon.prev_evolution ? searchedPokemon.prev_evolution.map(e => e.name).join(" → ") : "Aucune";

  return {
    name: searchedPokemon.name,
    type: searchedPokemon.type.join(", "),
    height: searchedPokemon.height,
    weight: searchedPokemon.weight,
    prevEvol: prevEvol,
    nextEvol: nextEvol,
    weaknesses: searchedPokemon.weaknesses.join(", "),
    img: searchedPokemon.img
  };
}

function displayPokemonInfo(name) {
  const container = document.getElementById("pokemon-info");
  container.innerHTML = "";

  const pokemon = searchPokemon(name);
  if (!pokemon) {
    container.innerHTML = "<p>❌ Pokémon not found!</p>";
    return;
  }

  const card = document.createElement("div");
  card.className = "pokemon-card";

  card.innerHTML = `
    <img src="${pokemon.img}" alt="${pokemon.name}">
    <h2>${pokemon.name}</h2>
    <p><strong>Type:</strong> ${pokemon.type}</p>
    <p><strong>Height:</strong> ${pokemon.height}</p>
    <p><strong>Weight:</strong> ${pokemon.weight}</p>
    <p><strong>Prev Evolutions:</strong> ${pokemon.prevEvol}</p>
    <p><strong>Next Evolutions:</strong> ${pokemon.nextEvol}</p>
    <p><strong>Weaknesses:</strong> ${pokemon.weaknesses}</p>
  `;

  container.appendChild(card);
}