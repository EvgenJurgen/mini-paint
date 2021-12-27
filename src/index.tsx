import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useRoutes } from './pages/routes';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './core/reducers/rootReducer';
import { rootSaga } from './core/sagas';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [saga]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

saga.run(rootSaga)

const routes = useRoutes(false)

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
      <BrowserRouter>{routes}</BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


