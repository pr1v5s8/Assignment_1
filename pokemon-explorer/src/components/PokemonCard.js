import React from "react";
import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
    return (
        <div className="card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <p>ID: #{pokemon.id}</p>
            <div className="types">
                {pokemon.types.map((type) => (
                    <span key={type} className={`type ${type}`}>
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default PokemonCard;