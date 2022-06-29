import React, { Component } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";


// const role = localStorage.getItem("role")

export default class Login extends Component {
    state ={
        email: "",
        password: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        const { email, password } = this.state;
        e.preventDefault();
        fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        .then(res => res.json())
        .then(res => {
           if(res.token) {
              fetch("http://localhost:5000/auth/me", {
                headers: {
                  "Content-type": "application/json",
                  Authorization: res.token
                }
              })
                .then(res => res.json())
                .then(data => {
                  localStorage.setItem("token", res.token);
                  localStorage.setItem("userId", res.userId);
                  localStorage.setItem("role", data.role);
                  console.log(data.role);
                  {data.role === "member" && (window.location = "/user")}
                  {data.role === "admin" && (window.location = "/parcels")}
                  toast.success(data.msg);
                })

           } else if(res.msg) {
             toast.error(res.msg);
           }
        })
        .catch(err => console.log(err))
    };

    render() {
        return (
          <div>
            <h1 className="login">LOGIN</h1>
            <form className="form" onSubmit={this.handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                required={true}
              />{" "}
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                required={true}
              />
              <br />
              <button className="submit">Submit</button>
            </form>
          </div>
        );
    }
}
