import {configureStore} from '@reduxjs/toolkit';
// filepath: /Users/sanjays/Desktop/mern-auth/client/src/redux/store.js
import userReducer from '../user/userSlice'; // Adjust path if needed


export const store = configureStore({
    reducer: {user: userReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});