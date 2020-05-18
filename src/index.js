import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/index';
import { Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';





const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
  ));
  const persistor=persistStore(store);
  

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <ReduxToastr
    position='bottom-right'
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    />
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
