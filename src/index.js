import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

<<<<<<< HEAD
axios.defaults.baseURL = 'http://localhost:3000/api/v1/';
=======
axios.defaults.baseURL = 'https://cooper-api1.herokuapp.com/api/v1/';
>>>>>>> 5b7c23daf0726f8e1506d24647c8cd1d9ad75bb8

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
