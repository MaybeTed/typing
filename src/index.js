import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'babel-polyfill';
import App from './components/App';
import store from '../store';
import { Provider } from 'react-redux';

render(
	<Provider store={store}>
		<BrowserRouter>
		  <App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
