import './App.css'
import {
  Route,
  BrowserRouter as Router,
  Routes

} from "react-router-dom"
import Layout from './layout/Layout'
import Home from './pages/Home'
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <Home/>
          </Layout>
        } />

        <Route path='/search' element={
          <Layout>
            <p>Search page</p>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App
