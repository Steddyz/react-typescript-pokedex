import React, { useEffect, useState } from "react";
import axios from "axios";

import cl from "./RandomPokemon.module.css";

type Pokemon = {
  name: string;
  sprites: { front_default: string };
};

const RandomPokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const getRandomPokemon = async () => {
      try {
        const randomNumber = Math.floor(Math.random() * 100) + 1;

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.log(`Ошибка: ${error}`);
      }
    };
    getRandomPokemon();
  }, []);

  return (
    <div className={cl.random}>
      {pokemon ? (
        <p className={cl.title}>{pokemon.name}</p>
      ) : (
        <div>Загрузка...</div>
      )}
      {pokemon ? (
        <div className={cl.random__wrapper}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : (
        <div>Загрузкаю...</div>
      )}

      <p>Рандомный покемон</p>
    </div>
  );
};

export default RandomPokemon;
