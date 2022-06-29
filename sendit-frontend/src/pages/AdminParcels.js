import React, { Component } from 'react'
import { toast } from "react-toastify";
import Modal from "react-modal";
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export default class Profile extends Component {
  state = {
    profile: [],
    modalIsOpen: false,
    statusForm: false,
    status: "",
    location: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true, statusForm: true });
  };

  openModal2 = () => {
    this.setState({ modalIsOpen: true, statusForm: false });
  };

  afterOpenModal = () => {
    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    fetch("http://localhost:5000/auth/parcels", {
      headers: {
        "Content-type": "Application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
         console.log(data)
         data.sort((a, b) => a.id - b.id);
        this.setState({ profile: data }, console.log(data));
      })
      .catch((err) => console.log(err));
  }

  handleStatus = id => {
    const { status } = this.state;
    fetch("http://localhost:5000/auth/parcels/status", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        parcelId: id,
        status: status
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          window.location = "/parcels";
          toast.success(data.msg);
        }
      });
  };

  handleLocation = id => {
    const { location } = this.state;
    console.log(location);
    fetch("http://localhost:5000/auth/parcels/location", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        parcelId: id,
        location: location
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          window.location = "/parcels";
          toast.success(data.msg);
          console.log(data.msg);
        } else {
          console.log("error! unable to edit location");
        }
      });
  };

  render() {

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    const { profile } = this.state;
    const table = profile.map(data => {
      return (
        <tbody key={data.id}>
          <tr>
            <span>
              {" "}
              <button onClick={this.openModal2}>Edit Location</button>
            </span>
            <th scope="row">{data.id}</th>
            <td>{data.pickup_location}</td>
            <td>{data.destination}</td>
            <td>{data.recipient_name}</td>
            <td>{data.recipient_phone_no}</td>
            <td>{data.status}</td>

            <span>
              {" "}
              <button onClick={this.openModal}>Edit Status</button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                {this.state.statusForm && (
                  <h2 ref={(subtitle) => (this.subtitle = subtitle)}>
                    Please enter A preferred status
                  </h2>
                )}
                {this.state.statusForm === false && (
                  <h2 ref={(subtitle) => (this.subtitle = subtitle)}>
                    Please enter A preferred location
                  </h2>
                )}

                {this.state.statusForm ? (
                  <form onSubmit={() => this.handleStatus(data.id)}>
                    <button onClick={this.closeModal}>close</button>
                    <input
                      type="text"
                      name="status"
                      value={this.state.status}
                      onChange={this.handleChange}
                      required={true}
                    />
                    <button>submit</button>
                  </form>
                ) : (
                  <form onSubmit={() => this.handleLocation(data.id)}>
                    <button onClick={this.closeModal}>close</button>
                    <input
                      type="text"
                      name="location"
                      value={this.state.location}
                      onChange={this.handleChange}
                      required={true}
                    />
                    <button>submit</button>
                  </form>
                )}
              </Modal>{" "}
            </span>
          </tr>
        </tbody>
      );
    });

    return (
      <div className="all">
        <div className="profile">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th></th>
                <th scope="col">ID</th>
                <th scope="col">Pickup Location</th>
                <th scope="col">Destination</th>
                <th scope="col">Recipient Name</th>
                <th scope="col">Recipient Phone-No</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            {table}
          </table>
        </div>
      </div>
    );
    
  }
}
