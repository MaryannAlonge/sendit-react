import React, { Component } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/register.css"

const role = localStorage.getItem("role");

export default class Register extends Component {
    state ={
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: ""
    };
    handleSubmit = e => {
        e.preventDefault();
        const { firstName, lastName, email, phoneNo, password } = this.state;
        fetch("http://localhost:5000/auth/signup", {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_no: phoneNo,
            password: password
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.token) {
              fetch("http://localhost:5000/auth/me", {
                headers: {
                  "Content-type": "application/json",
                  Authorization: res.token
                }
              })
                .then(res => res.json())
                .then(data => {
                  console.log(data,
                      "role", res)
                  localStorage.setItem("token", res.token);
                  localStorage.setItem("userId", res.userId);
                  localStorage.setItem("role", data.role);
                 {role === "member" ? (window.location = "/user") : (window.location = "/parcels")}
                  toast.success(res.msg);
                });
            } else if (res.msg) {
              toast.error("email exists! please enter a new one");

              console.log(res.msg);
            } else {
              res.errors.forEach((err) => {
                toast.error(err.msg);
              });
            }
          })
          .catch((error) => console.log(error));
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    render() {
        return (
          <div>
              <h1 className="register">REGISTER</h1>
            <form className="form" onSubmit={this.handleSubmit}>
              <label htmlFor="fisrtName">First Name</label>
              <input 
              type="text" 
              name="firstName" 
              placeholder="First Name"
              onChange={this.handleChange}
              required={true}
              /> <br/>

              <label htmlFor="lastName">Last Name</label>
              <input 
              type="text" 
              name="lastName"
              placeholder="Last Name"
              onChange={this.handleChange}
              required={true}
              /> <br/>

              <label htmlFor="Email">Email</label>
              <input 
              type="email" 
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              required={true}
              /> <br/>

              <label htmlFor="mobile-no">Mobile Number</label>
              <input 
              type="text" 
              name="phoneNo" 
              placeholder="Mobile-No"
              onChange={this.handleChange}
              required={true}
              /> <br/>

              <label htmlFor="password">Password</label>
              <input 
              type="password" 
              name="password" 
              placeholder="Password"
              onChange={this.handleChange}
              required={true}
              />  <br/>
              <input type="submit" value="Submit" className="submit"/>
            </form>
          </div>
        );
    }
}
