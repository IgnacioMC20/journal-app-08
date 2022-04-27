// ! plantilla npx create-react-app redux --tempalte 
// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import { authReducer } from '../reducers/authReducer';
// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: {
  //     counter: counterReducer,
//     auth: authReducer,
//     ui: uiReducer,
//   },
// });


import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { uiReducer } from '../reducers/uiReducer';
import { authReducer } from "../reducers/authReducer";
import thunk from "redux-thunk";
import { notesReducer } from "../reducers/notesReducer";

const composeEnhaancers = (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    // reducers
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
})

export const store = createStore(reducers, composeEnhaancers( applyMiddleware( thunk ) ));