import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './ReduxFiles/Reducer/CombineReducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(promiseMiddleware, ReduxThunk),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )

);
export type RootStore  =  ReturnType<typeof rootReducer>

ReactDOM.render(
  <React.StrictMode>
     <Provider
        store={store}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
