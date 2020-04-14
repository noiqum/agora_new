import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import {BrowserRouter,Switch ,Route} from 'react-router-dom';
import Container from './components/container/container';
import Login from './components/auth/login';

function App() {

  
  return (
    <BrowserRouter>

    <div className="App">
      <Navbar/>
      <Switch>
          <Route path='/' exact component={Container}/>
          <Route path='/event'/>
          <Route path='/people'/>
          <Route path='/login' component={Login} />
          <Route path='/signup'/>
      </Switch>
    </div>
  
  </BrowserRouter>
  );
}

export default App;
