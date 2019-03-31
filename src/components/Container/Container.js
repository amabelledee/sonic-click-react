import React from 'react';
import './Container.css';
import Character from '../Character';

// Container for each Character component
const Container = props => (
  // loops for every iamge
  <div
    className={
      props.shake
        ? 'container d-flex flex-wrap justify-content-center shake'
        : 'container d-flex flex-wrap justify-content-center'
    }
  >
    {props.characters.map((a, i) => <Character name={a} key={i} clickEvent={props.clickEvent} />)}
  </div>
);

export default Container;
