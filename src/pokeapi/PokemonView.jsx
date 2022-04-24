import React from 'react'

export const PokemonView = ({ name, types, sprites }) => {


    console.log('rendering pokemon view');
  return (
    <div className="col-3">
        <div className='card border-0 my-3 py-5 bg-transparent'>
            <div className="card-title">
                <h2>{name[0].toUpperCase() + name.slice(1) }</h2> {/* // ? poner la primera letra en mayuscula */}
                <img src={sprites.front_default} alt="" />
                <h4>Types:</h4>
                <ul>
                    {types.map( (types, i) => (<li key={i} style={ {"listStyleType": "circle"} }> {types.type.name[0].toUpperCase() + types.type.name.slice(1)} </li>) )}
                </ul>

                {/* <p>{ effect_entries[0].effect }</p> */}
            </div>
        </div>
    </div>
  )
}
