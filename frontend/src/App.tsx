import './App.css'
import {
  Route,
  BrowserRouter as Router,
  Routes

} from "react-router-dom"
import Layout from './layout/Layout'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import SignInPage from './pages/SignInPage'
import { useAppContext } from './contexts/AppContext'
import AddHotel from './pages/AddHotel'
import MyHotels from './pages/MyHotels'


function App() {

  const { isLoggedIn, isLoading } = useAppContext()

  if (isLoading) return (<div className='w-screen h-screen flex justify-center items-center bg-black text-white'>
    <h1>Loading...</h1>
  </div>)
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path='/sign-up' element={
          <Layout>
            <SignupPage />
          </Layout>
        } />

        <Route path='/sign-in' element={
          <Layout>
            <SignInPage />
          </Layout>
        } />

        {
          isLoggedIn && (
            <>
              <Route
                path='/add-hotels'
                element={<Layout>
                  <AddHotel />
                </Layout>}

              />
              <Route
                path='/my-hotels'
                element={<Layout>
                  <MyHotels />
                </Layout>}

              />
            </>
          )
        }


        <Route path='/search' element={
          <Layout>
            <p>Search page</p>
          </Layout>
        } />
      </Routes>
      {/* <Route path='*'element= {<h1>OOPS! route not found</h1>} /> */}
    </Router>
  )
}

export default App
