import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom/client';
=======
import { createRoot } from 'react-dom/client';
>>>>>>> 76a6268 (Initial commit)
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

<<<<<<< HEAD
const root = ReactDOM.createRoot(rootElement);
=======
const root = createRoot(rootElement);
>>>>>>> 76a6268 (Initial commit)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
