import React, {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();

        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        const formatted = details.map((poke) => ({
          id: poke.id,
          name: poke.name,
          image: poke.sprites.front_default,
          types: poke.types.map((t) => t.type.name),
        }));

        const allTypes = [
          ...new Set(formatted.flatMap((p) => p.types)),
        ].sort();

        setPokemonList(formatted);
        setFilteredList(formatted);
        setTypes(allTypes);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokemon.");
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((p) => {
      const matchesName = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      const matchesType = 
      selectedType === "All" || p.types.includes(selectedType.toLowerCase());
      return matchesName && matchesType;
    });

    setFilteredList(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  return (
    <div className="App">
      <header>
        <h1>Pokemon Explorer</h1>
      </header>

      <div className="controls">
        <searchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter
        types={types}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        />
      </div>

      {loading && <p className="status">Loading Pokemon...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && filteredList.length === 0 && (
        <p className="status">No Pokemon match your search.</p>
      )}

      <div className="grid">
        {filteredList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;