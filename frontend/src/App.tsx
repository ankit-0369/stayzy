import './App.css'
import {
  Route,
  BrowserRouter as Router,
  Routes

} from "react-router-dom"
import Layout from './layout/Layout'
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <p>Home page</p>
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
