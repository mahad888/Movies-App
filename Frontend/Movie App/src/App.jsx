import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import SignUp from './pages/SignUp';
import MovieList from './pages/MoviesList';
import MovieDetails from './pages/MoviesDetail';

function App() {

  

  return (
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<Login/>} />
  <Route path="/register" element= {<SignUp/>} />
  <Route path = '/movies-list' element={<MovieList/>} />
  <Route path = 'movies-list/movies/:id' element={<MovieDetails/>} />
  </Routes>
</BrowserRouter>

    


  )
}

export default App
