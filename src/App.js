import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import BuilderList from './components/BuilderList';
// import Builder from './components/Builder';
import Car from './components/Car';
// import Bar from './components/Navbar';
import Login from './components/Login';
import Garage from './components/Garage'
import Register from './components/Register'
// import CarList from './components/CarList';
import HomePage from './components/HomePage'
// import Project from './components/Project';
// import VinLookup from './components/VinLookup';
import styled from 'styled-components';
import img from './images/francesco-ungaro-1208184-unsplash.jpg'
import BuilderProfile from './components/BuilderProfile';

const Body = styled.div`
  background-image: url(${img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  align-content: center;
`
function App() {
  return (
    <Router>
      {/* <Bar /> */}
      <Body>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/mygarage' component={Garage} />
          <Route exact path='/profile' component={BuilderProfile} />
          {/* <Route exact path='/builders' component={BuilderList} /> */}
          {/* <Route exact path='/cars/' component={CarList} /> */}
          {/* <Route exact path='/builders/:id' component={Builder} /> */}
          <Route exact path='/cars/:id' component={Car} />
          {/* <Route exact path='/projects/:id' component={Project} /> */}
          {/* <Route exact path='/projects/' component={CarList} /> */}
          {/* <Route exact path='/vinlookup/' component={VinLookup} /> */}
        </Switch>
      </Body>
    </Router>
  );
}

export default App;
