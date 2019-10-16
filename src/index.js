import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

import store from './redux/store';

const rootElement = document.getElementById('root');

ReactDOM.render(
<Provider store={ store }>
    <CookiesProvider>
        <App />
    </CookiesProvider>
</Provider>, rootElement);
registerServiceWorker();
