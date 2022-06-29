import React, { Component } from 'react'
import Logo from "../images/parcel.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/createOrder.css";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

export default class CreateOrder extends Component {
  state = {
    pickupLocation: "",
    destination: "",
    recipientName: "",
    recipientNo: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      pickupLocation,
      destination,
      recipientNo,
      recipientName
    } = this.state;
     fetch("http://localhost:5000/auth/parcels", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        pickup_location: pickupLocation,
        destination: destination,
        recipient_name: recipientName,
        recipient_phone_no: recipientNo
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          toast.success(data.msg);
          window.location = "/user";
        } else {
          data.errors.forEach((err) => {
            toast.error(err.msg);
          });
        }
      });
  };

  render() {
    return (
      <div>
        <h1 className="pickupLocation">CREATE ORDER</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <label htmlFor="pickupLocation">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            onChange={this.handleChange}
            required={true}
          />
          <label htmlFor="Destination">Destination</label>
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            onChange={this.handleChange}
            required={true}
          />
          <label htmlFor="Recipient-name">Recipient's Name</label>
          <input
            type="text"
            name="recipientName"
            placeholder="Recipient's name"
            onChange={this.handleChange}
            required={true}
          />
          <label htmlFor="Recipient's Mobile-No">Recipient's Mobile-No</label>
          <input
            type="text"
            name="recipientNo"
            placeholder="Recipient's Mobile-No"
            onChange={this.handleChange}
            required={true}
          />
          <input type="submit" value="Create" className="submit" />
        </form>
      </div>
    );
  }
}
