import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './components/ToDo/ToDo';
import {inSessionStore}  from './api/api';

ReactDOM.render(<ToDo taskApi={inSessionStore} styleName="root-block__todo"/>, document.getElementById('root'));
