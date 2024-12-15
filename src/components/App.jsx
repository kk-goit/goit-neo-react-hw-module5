import { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'

const Loader            = lazy(() => import('./Loader/Loader'))
const Header            = lazy(() => import('./Header/Header'))
const HomePage          = lazy(() => import('../pages/HomePage/HomePage'))
const MoviesPage        = lazy(() => import('../pages/MoviesPage/MoviesPage'))
const NotFoundPage      = lazy(() => import("../pages/NotFoundPage/NotFoundPage"))
const MovieDetailsPage  = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"))
const MovieCast         = lazy(() => import("../components/MovieCast/MovieCast"))
const MovieReviews      = lazy(() => import("../components/MovieReviews/MovieReviews"))

function App() {
  function handleErrMsg(msg) {
    msg && toast.error(msg)
  }
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage setErrMsg={handleErrMsg} />} />
          <Route path="/movies" element={<MoviesPage setErrMsg={handleErrMsg} />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage setErrMsg={handleErrMsg}/>}>
            <Route path="cast" element={<MovieCast setErrMsg={handleErrMsg} />} />
            <Route path="reviews" element={<MovieReviews setErrMsg={handleErrMsg} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position='top-center' toastOptions={{duration: 1750, style: {color: "red"}}}/>
    </>
  )
}

export default App
