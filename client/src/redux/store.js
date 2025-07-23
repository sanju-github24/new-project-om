import {combineReducers, configureStore} from '@reduxjs/toolkit';
// filepath: /Users/sanjays/Desktop/mern-auth/client/src/redux/store.js
import userReducer from '../user/userSlice'; // Adjust path if needed
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import persistStore from 'redux-persist/es/persistStore';


const rootReducer = combineReducers({ user: userReducer})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);