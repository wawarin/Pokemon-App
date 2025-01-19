"use client";
import { GET_POKEMON_BY_NAME } from "../../../graphQL/queries";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import "../../style.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
const PokemonPage = () => {
  const router = useRouter();
  const pathname = usePathname(); // Access full URL path
  const slug = pathname.split("/").pop();
  const [pokemonName, setPokemonName] = useState("");

  const { data, loading, error } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: slug },
    skip: !slug, // Skip query if no name is provided
  });

  const handleCardClick = (name) => {
    // const newPath = `/pokemon/${name}`;
    // window.history.replaceState(null, "", newPath);
    router.push(`/pokemon/${name}`);
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
    // router.push(`/pokemon/${name}`);
  };

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleHomeClick = () => {
    router.push("/");
  };

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
        <section>
          {/* {isLoading && (
            <div className="loading">
              <CircularProgress />
              <p>Loading...</p>
            </div>
          )}
          {isError && (
            <div className="error">
              <p>Something went wrong. Please try again later.</p>
            </div>
          )} */}
          <div className="pokemon-details">
            {data?.pokemon && (
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default PokemonPage;
