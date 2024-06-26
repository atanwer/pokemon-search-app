const elements = {
  searchInput: document.getElementById("search-input"),
  searchBtn: document.getElementById("search-button"),
  pokemonName: document.getElementById("pokemon-name"),
  pokemonId: document.getElementById("pokemon-id"),
  weight: document.getElementById("weight"),
  height: document.getElementById("height"),
  hp: document.getElementById("hp"),
  attack: document.getElementById("attack"),
  defense: document.getElementById("defense"),
  specialAttack: document.getElementById("special-attack"),
  specialDefense: document.getElementById("special-defense"),
  speed: document.getElementById("speed"),
  pokemonImgContainer: document.getElementById("pokemon-img-container"),
  types: document.getElementById("types")
};

const setData = data => {
  const { name, id, weight, height, stats, sprites, types } = data;

  elements.pokemonName.textContent = name.toUpperCase();
  elements.pokemonId.textContent = `#${id}`;
  elements.weight.textContent = `Weight: ${weight}`;
  elements.height.textContent = `Height: ${height}`;

  const statMap = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
  stats.forEach((stat, index) => {
    elements[statMap[index]].textContent = stat.base_stat;
  });

  elements.pokemonImgContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}"/>`;
  elements.types.innerHTML = types.map(type => `<p>${type.type.name.toUpperCase()}</p>`).join('');
};

const resetData = () => {
  Object.values(elements).forEach(element => {
    if (element !== elements.searchInput && element !== elements.searchBtn) {
      element.textContent = "";
    }
  });
  elements.pokemonImgContainer.innerHTML = "";
};

const fetchPokemon = async () => {
  const nameOrId = elements.searchInput.value.trim().toLowerCase();
  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.status === 404 ? "Pokémon not found" : "An error occurred");
    }
    const data = await res.json();
    setData(data);
  } catch (err) {
    alert(err.message);
    resetData();
    console.error(err);
  }
};

elements.searchBtn.addEventListener("click", fetchPokemon);