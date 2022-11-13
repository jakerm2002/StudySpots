import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line
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
import { createContext, useState} from 'react';
import Button from 'react-bootstrap/Button';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark": "light"));
  }
  return(
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
      <div className="App" id={theme}>
        <Navigation id={theme}/>
        <div className='switchButton'>
          <label>{theme === "light" ? "Light Mode" : "Dark Mode"} </label>
          <Button onClick={toggleTheme}/>
        </div> 
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
    </ThemeContext.Provider>
  )
}

export default App;