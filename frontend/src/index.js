import React from 'react';
import ReactDOM from 'react-dom/client'; //there is no client thing in video resource
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  );
