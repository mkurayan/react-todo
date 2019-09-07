import React from 'react';
import './Button.css';

function Button(props) {
    return (
      <button className="button" onClick={props.onClick}>
        <span>{props.text}</span>
      </button>
    );
}

export default Button;