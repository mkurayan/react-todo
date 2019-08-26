import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './components/ToDo/ToDo';

var app = ReactDOM.render(<ToDo />, document.getElementById('root'));

app.addTask("First task");
app.addTask("Second task");
app.addTask("Third task");



