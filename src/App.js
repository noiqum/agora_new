import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import {BrowserRouter,Switch ,Route} from 'react-router-dom';
import Container from './components/container/container';

function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <Navbar/>
      <Switch>
          <Route path='/' exact component={Container}/>
          <Route path='/event'/>
      </Switch>
    </div>
  
  </BrowserRouter>
  );
}

export default App;
