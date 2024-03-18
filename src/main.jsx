import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime'

// Using createRoot method from ReactDOM
const root = createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
      <App />
    </BrowserRouter>

);

