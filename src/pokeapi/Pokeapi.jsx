import React, { useMemo, useState } from 'react'
import { PokemonView } from '../pokeapi/PokemonView';

export const Pokeapi = () => {

    console.log('rendering pokeapi');
    
    const [number, setNumber] = useState(1);
    const [pokemonArr, setPokemonArr] = useState([]);

    const getPokemon = async (pokenumber) => {

        const url = `https://pokeapi.co/api/v2/pokemon-form/${pokenumber}`;
        
        try {
            
            const pokemon = await fetch(url);
            const {name, types, sprites} = await pokemon.json();
    
            setPokemonArr(prev => [ ...prev, {name, types, sprites } ]);
            setNumber(number + 1);
    
        } catch (error) {
            console.log(error);
        }
    }    


  return (
    <div className="container py-5">
        <h1>Pokeapi <span className='text-muted mx-4'>Current pokemon: <b>{ number }</b> </span></h1>
        <button onClick={ () => getPokemon(number)} className="btn btn-primary" >Get Pokemon</button>
        {/* <span className='mx-5'> { pokemonArr.length } </span> */}

        <div className="row">
            {
                (pokemonArr.length > 0) && pokemonArr.map((pokemon, i) => <PokemonView key={i} {...pokemon} />)
            }
        </div>
        
        
    </div>
  )
}
