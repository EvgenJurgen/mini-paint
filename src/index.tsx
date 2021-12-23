import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useRoutes } from './pages/routes';
import {BrowserRouter} from 'react-router-dom'


const routes = useRoutes(false)

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>{routes}</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


