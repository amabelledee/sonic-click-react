import React from 'react';
import './Character.css';

// onClick function definition
// check if image is clicked or not
const Character = props => (
  <div className="card" onClick={e => props.clickEvent(e.target.src)}>
    <img className="card-img-top card-height" src={props.name} alt="" />
  </div>
);

export default Character;