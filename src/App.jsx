
import './App.css'
import { LandingPage } from './pages/landing-page/landing-page'
import { Route, Routes } from 'react-router-dom'
import Loginpage from './pages/login-page/loginpage'
import { Navbar } from './pages/landing-page/nav-bar'
import Category from './pages/category/category'
import DataAnalytics from './pages/data-analytics/data-analytics'
import Slide from './components/slider/slide'
import ReactPage from './pages/react/react-page'

function App() {
  
  return (
    <div className='App'>
      <Navbar/>
    <Routes>
     <Route path='/' element={<Loginpage/>}/>
     <Route path='/landing' element={<LandingPage/>}/>
     <Route path='/category' element={<Category/>}/>
     <Route path='/data-analytics' element={<DataAnalytics/>}/>
     <Route path='/start' element={<Slide/>}/>
     <Route path='/react-questions' element={<ReactPage/>}/>
    </Routes>
    </div>
  )
}

export default App



