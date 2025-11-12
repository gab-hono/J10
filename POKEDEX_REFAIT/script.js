const root = document.getElementById('root');

async function pokemonResponse() {
    const response = await fetch(
        'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    );

    const data = await response.json(); 

    const mainList = document.createElement('ul');
    mainList.id = 'pokemon-list';
    root.appendChild(mainList);

    for (let i = 0; i < data.pokemon.length; i++) {
        const pkmData = data.pokemon[i];

        const pokemonItem = document.createElement('li');
        pokemonItem.classList.add('pokemon-item');
        pokemonItem.innerHTML = `Number: ${pkmData.num} - Name: ${pkmData.name}`;
        mainList.appendChild(pokemonItem);

        const detailsList = document.createElement('ul');
        detailsList.classList.add('pokemon-details');
        pokemonItem.appendChild(detailsList);

        const pkmImg = document.createElement('li');
        pkmImg.classList.add('image');
        pkmImg.innerHTML = `<img src='${pkmData.img}' alt='${pkmData.name}' />`;
        detailsList.appendChild(pkmImg);

        const pkmType = document.createElement('li');
        pkmType.classList.add('type');
        pkmType.innerHTML = `Type: ${pkmData.type.join(', ')}`;
        detailsList.appendChild(pkmType);



        const pkmWeight = parseFloat(pkmData.weight);
        if (pkmWeight > 10) {
            const pkmPoids = document.createElement('li');
            pkmPoids.classList.add('weight');
            pkmPoids.innerHTML = `Weight: ${pkmData.weight}`;
            detailsList.appendChild(pkmPoids);
        }

        if (pkmData.prev_evolution && pkmData.prev_evolution.length > 0) {
            let prevNames = '';
            for (let j = 0; j < pkmData.prev_evolution.length; j++) {
                prevNames += pkmData.prev_evolution[j].name;
                if (j < pkmData.prev_evolution.length - 1) {
                    prevNames += ' → ';
                }
            }
            const pkmPrevEv = document.createElement('li');
            pkmPrevEv.classList.add('previous-evolution');
            pkmPrevEv.innerHTML = `Previous Evolutions: ${prevNames}`;
            detailsList.appendChild(pkmPrevEv);
        }

        if (pkmData.next_evolution && pkmData.next_evolution.length > 0) {
            let nextNames = '';
            for (let k = 0; k < pkmData.next_evolution.length; k++) {
                nextNames += pkmData.next_evolution[k].name;
                if (k < pkmData.next_evolution.length - 1) {
                    nextNames += ' → ';
                }
            }
            const pkmNextEv = document.createElement('li');
            pkmNextEv.classList.add('next-evolution');
            pkmNextEv.innerHTML = `Next Evolutions: ${nextNames}`;
            detailsList.appendChild(pkmNextEv);
        }
    }
}

pokemonResponse();
