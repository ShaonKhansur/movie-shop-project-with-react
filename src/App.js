import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./componetns/movies";
import Customers from "./componetns/customers";
import Rentals from "./componetns/rentals";
import NotFound from "./componetns/notFound";
import NavBar from "./componetns/NavBar";
import MovieForm from "./componetns/movieForm";
import LoginForm from './componetns/loginForm';
import RegisterForm from './componetns/registerForm';
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route> 
          <Route path="/register" component={RegisterForm}></Route> 
          <Route path="/movies/:id" component={MovieForm}></Route> 
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
