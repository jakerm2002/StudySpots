import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, Router} from 'react-router-dom'

import Navigation from './general_components/Navigation'

import './App.css';
import About from './pages/About';
import Search from "./pages/Search";
import CoffeeShops from './pages/CoffeeShops'
import Libraries from './pages/Libraries'
import Splash from './pages/Splash'
import Universities from './pages/Universities'
import InstanceCoffee from './general_components/InstanceCoffee'
import InstanceUniversity from './general_components/InstanceUniversity'
import InstanceLibrary from "./general_components/InstanceLibrary"

function App() {
  return(
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Splash/>}/>
        <Route path="/Search" element={<Search/>}/>
        <Route path='/CoffeeShops' element={<CoffeeShops/>}/>
        <Route path='/Libraries' element={<Libraries/>}/>
        <Route path='/Universities' element={<Universities/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/CoffeeShops/:businessID' element={<InstanceCoffee/>}/>
        <Route path='/Universities/:universityID' element={<InstanceUniversity/>}/>
        <Route path='/Libraries/:businessID' element={<InstanceLibrary/>}/>
      </Routes>
    </div>
  )
}

export default App;