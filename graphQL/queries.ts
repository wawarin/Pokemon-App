import { gql } from "@apollo/client";

// export const GET_POKEMON_BY_NAME = gql`
//   query GetPokemon($name: String!) {
//     pokemon(name: $name) {
//       id
//       name
//       types
//       classification
//       maxHP
//       maxCP
//       image
//     }
//   }
// `;

export const GET_POKEMON_BY_NAME = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        image
      }
    }
  }
`;

export const GET_ALL_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;
