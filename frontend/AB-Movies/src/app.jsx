import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Navbar } from './component/Navbar'
import Home from './pages/Home'
import TvSeriesPage from './pages/tvSeries'
import SignUpPage from "./pages/signUp"
import Login from "./pages/login"
import MoviesPage from './pages/movies'
import BookMarkPage from "./pages/bookMark"
import { Routes, Route } from 'react-router-dom'
import Trending from './pages/homePage/trending'
import Recommended from './pages/homePage/recommended'
import DetailsPage from "./pages/movieDetails"



export function App() {

  return (
    <div className='bg-green-100 min-h-screen flex flex-col'>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
          
          <Route path='/home/recommended' element={<Recommended />} />
          <Route path='/home/trending' element={<Trending />} />
        </Route>
        <Route path='/login' element={< Login />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='moviesPage' element={<MoviesPage/>}/>
        <Route path="/detailsPage/:type/:id" element={<DetailsPage />} />
        <Route path='tvSeriesPage' element={<TvSeriesPage />} />
        <Route path='/BookMarkPage' element={<BookMarkPage />} />
      </Routes>


    </div>
  )
}

