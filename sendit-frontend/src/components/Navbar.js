import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from "../images/parcel.png";
import "../styles/navbar.css";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

export default class Navbar extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="">
            <img src= {Logo}  className="logo" alt="logo" onClick={this.handleToggle}  />
              <span>SENDit</span>
            </Link>
            {!token && (<ul className=" links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>)}
            
            {(token && role === "member") && (
            <ul className=" links">
              <li><NavLink to="#">{this.props.firstName}</NavLink></li>
              <li><NavLink to="/user">Dashboard</NavLink></li>
              <li><NavLink to="/create-order">Create Order</NavLink></li>
              <li><NavLink to="/" onClick={this.handleLogout}>Logout</NavLink></li>
            </ul>)}

            {(token && role === "admin") && (<ul className=" links">
              <li><NavLink to="#">{this.props.firstName}</NavLink></li>
              <li><NavLink to="/parcels">All-Orders</NavLink></li>
              <li><NavLink to="/" onClick={this.handleLogout}>Logout</NavLink></li>
            </ul>)}

          </div>
        </nav>
      </div>
    );
  }
}


