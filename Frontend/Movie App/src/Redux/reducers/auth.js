import { createSlice } from "@reduxjs/toolkit";

const authSlice =  createSlice({
    name: 'auth',
    initialState: {
        user: null,
        movies: [],
        isDarkMode: false,
        loader: true,
       
    },
    reducers: {
        setUserFromStorage(state, action) {
            state.user = action.payload;
          },
        userExist: (state, action) => {
            state.user = action.payload;
            state.loader=false;
            console.log("User set in state:", action.payload);

        },
        userNotExist:(state) => {
            state.user = null;
            state.loader=false;
        },
        setMovies: (state, action) => {
            state.movies = action.payload;
          },
          toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
          },
          setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
          },
        
    },
});

export default authSlice;
export const {setUserFromStorage,userExist, userNotExist,setMovies, toggleDarkMode, setDarkMode} = authSlice.actions;