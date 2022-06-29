import React, { Component } from "react";
import './App.css';
import { Route, Redirect } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import AdminParcels from "./pages/AdminParcels"
import CreateOrder from "./pages/CreateOrder"
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";


const token = localStorage.getItem("token")
const role = localStorage.getItem("role")

export class App extends Component {
  state = {
    firstName: ""
  };

  componentDidMount() {
    fetch("http://localhost:5000/auth/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          firstName: res.first_name
        })
      );
  }

  render() {
    return (
      <div className="App">
        <Navbar firstName={this.state.firstName} />
        <div className="container">
          <Route
            exact
            path="/"
            render={() => {
              return <Home />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if(!token) return <Register />;
              return <Redirect to="/user" />
              
            }}
          />
          <Route
            path="/login"
            render={() => {
              if (!token) return <Login />;
              return <Redirect to="/" />;
            }}
          />

          <Route
            path="/user"
            render={() => {
              if (role === "member") return <Profile />;
              return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/parcels"
            render={() => {
              if (role === "admin") return <AdminParcels />;
              return <Redirect to="/user" />;
            }}
          />
          <Route
            path="/create-order"
            render={() => {
              if (token) return <CreateOrder />;
              return <Redirect to="/login" />;
            }}
          />
        </div>
        <Footer />
      </div>
    );
  }
}


export default App;
 