export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface Evolution {
  id: string;
  name: string;
  image: string;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: { minimum: number; maximum: number };
  height: { minimum: number; maximum: number };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions: Evolution[];
}
