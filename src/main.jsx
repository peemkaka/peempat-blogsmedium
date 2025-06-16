import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import Context from './context/context';
import 'react-quill/dist/quill.bubble.css';
import 'react-tagsinput/react-tagsinput.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
