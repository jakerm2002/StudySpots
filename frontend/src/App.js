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
        <Route path='/' component={Splash}/>
        <Route path='/CoffeeShops' component={CoffeeShops}/>
        <Route path='/Libraries' component={Libraries}/>
        <Route path='/Universities' component={Universities}/>
        <Route path='/About' component={About}/>
      </Routes>
    </div>
  )
}

export default App;