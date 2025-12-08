import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
