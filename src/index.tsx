import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-dyy0v56xmxzyf6o6.us.auth0.com"
      clientId="I5gcvfUiOML9xmZ52QXUsGJqZVEBiSDR"
      authorizationParams={{
        redirect_uri: window.location.origin + '/react-auth0/profile',
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
