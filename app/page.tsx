"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_NAME, GET_ALL_POKEMONS } from "../graphQL/queries";
import { CircularProgress } from "@mui/material";
import "./style.css";
import { usePathname, useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [pokemonName, setPokemonName] = useState("");
  const [typing, setTyping] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10); // Tracks how many Pokémon are visible

  const { data, loading, error } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: pokemonName },
    skip: !pokemonName, // Skip query if no name is provided
  });

  const {
    data: allPokemons,
    loading: allLoading,
    error: allError,
  } = useQuery(GET_ALL_POKEMONS, {
    variables: { first: 1000 }, // Fetch all Pokémon at once
  });

  // Hadle Function

  const handleCardClick = (name: any) => {
    setPokemonName(name);
    const newPath = `/pokemon/${name}`;
    window.history.replaceState(null, "", newPath);
    // router.push(`/pokemon/${name}`);
  };

  const handleInputChange = (e: any) => {
    setPokemonName(e.target.value);
    // const newPath = `/pokemon/${e.target.value}`;
    // window.history.replaceState(null, "", newPath);
    setTyping(true);

    // Simulate a debounce effect with a timeout
    setTimeout(() => {
      setTyping(false);
    }, 500);
  };

  const handleSearch = () => {
    if (!pokemonName) {
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter a Pokémon name",
      });
    }
    const newPath = `/pokemon/${name}`;
    window.history.replaceState(null, "", newPath);
  };

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 10); // Increase visible Pokémon count by 10
  };

  const handleHomeClick = () => {
    setPokemonName(""); // Clear the search
    window.history.replaceState(null, "", "/");
  };

  const isLoading = typing || loading || allLoading;
  const isError = error || allError;

  const visiblePokemons = allPokemons?.pokemons.slice(0, visibleCount) || []; // Limit displayed Pokémon

  return (
    <div className="app">
      <header className="app-bar">
        <button className="home-button" onClick={handleHomeClick}>
          Home
        </button>
        <h1 className="app-title">Pokémon Finder</h1>
      </header>

      <main className="pokemon-container">
        <section className="pokemon-search">
          <div className="pokemon-search__input">
            <input
              type="text"
              value={pokemonName}
              onChange={handleInputChange}
              placeholder="Enter Pokémon name"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </section>

        <section className="pokemon-details">
          {isLoading && (
            <div className="loading">
              <CircularProgress />
              <p>Loading...</p>
            </div>
          )}
          {isError && (
            <div className="error">
              <p>Something went wrong. Please try again later.</p>
            </div>
          )}
          {!pokemonName && !isLoading && allPokemons && (
            <div className="pokemon-cards">
              {visiblePokemons.map((pokemon: any) => (
                <div
                  key={pokemon.id}
                  className="pokemon-card"
                  onClick={() => {
                    handleCardClick(pokemon.name);
                  }}
                  style={{ textAlign: "left" }}
                >
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    style={{ display: "block", margin: "0 auto" }}
                  />
                  <h4>#{pokemon.number}</h4>
                  <h2>{pokemon.name}</h2>
                  <p>
                    <b>Classification:</b> {pokemon.classification}
                  </p>
                  {pokemon.types && (
                    <div className="pokemon-types">
                      {pokemon.types.map((type: any, index: any) => (
                        <span
                          key={index}
                          className={`type-box ${type.toLowerCase()}`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                  <p>
                    <b>Max HP:</b>{" "}
                    <span className="max-hp">{pokemon.maxHP}</span>
                  </p>
                  <p>
                    <b>Max CP:</b>{" "}
                    <span className="max-cp">{pokemon.maxCP}</span>
                  </p>
                </div>
              ))}
              {visibleCount < allPokemons.pokemons.length && (
                <button className="load-more-button" onClick={handleLoadMore}>
                  Load More
                </button>
              )}
            </div>
          )}
          {pokemonName && data?.pokemon && !isLoading && (
            <div className="pokemon-details__info">
              <h2>{data.pokemon.name}</h2>
              <img src={data.pokemon.image} alt={data.pokemon.name} />
              <p>
                <b>Classification:</b> {data.pokemon.classification}
              </p>
              {data.pokemon.types && (
                <div className="pokemon-types">
                  {data.pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className={`type-box ${type.toLowerCase()}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}
              <p>
                <b>Max HP:</b>{" "}
                <span className="max-hp">{data.pokemon.maxHP}</span>
              </p>
              <p>
                <b>Max CP:</b>{" "}
                <span className="max-cp">{data.pokemon.maxCP}</span>
              </p>

              {data.pokemon.evolutions?.length > 0 && (
                <div className="pokemon-evolutions">
                  <h3>
                    <b>Evolutions:</b>
                  </h3>
                  <div className="evolution-cards">
                    {data.pokemon.evolutions.map((evolution) => (
                      <div
                        key={evolution.id}
                        className="evolution-card"
                        onClick={() => handleCardClick(evolution.name)}
                      >
                        <img src={evolution.image} alt={evolution.name} />
                        <h4>{evolution.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {pokemonName && !data?.pokemon && !isLoading && (
            <div className="no-results">
              <p>No Pokémon found with the name "{pokemonName}".</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
