import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom'

import Navigation from './general_components/Navigation'

import './App.css';
import About from './pages/About';
import CoffeeShops from './pages/CoffeeShops'
import Libraries from './pages/Libraries'
import Splash from './pages/Splash'
import Universities from './pages/Universities'

function App() {
  return(
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Splash/>}/>
        <Route path='/CoffeeShops/*' element={<CoffeeShops/>}/>
        <Route path='/Libraries' element={<Libraries/>}/>
        <Route path='/Universities' element={<Universities/>}/>
        <Route path='/About' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App;