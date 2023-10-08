import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import ContextProvider from './store/ContextProvider';
import { BrowserRouter} from 'react-router-dom';

// @ts-expect-error
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

