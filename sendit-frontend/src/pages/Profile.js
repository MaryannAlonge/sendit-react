import React, { Component } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export default class Profile extends Component {
  state = {
    profile: [],
    modalIsOpen: false,
    destination: "",
  };

  handleChange = (e) => {
    this.setState({
      destination: e.target.value,
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    fetch(`http://localhost:5000/auth/${userId}/parcels`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          data.sort((a, b) => a.id - b.id);
          this.setState({ profile: data });
        } else {
          console.log("no data yet");
        }
      })
      .catch((err) => console.log(err));
  }

  handleEdit = (id) => {
    // const answer = window.prompt("Please Input A Preferred Destination");
    const { destination } = this.state;
    console.log(destination);
    fetch("http://localhost:5000/auth/parcels/destination", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        parcelId: id,
        user_id: userId,
        destination: destination,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          window.location = "/user";
          toast.success(data.msg);
        }
      });
  };

  handleCancel = (id) => {
    if (window.confirm("are you sure you want to delete this parcel?")) {
      fetch("http://localhost:5000/auth/parcels/cancel", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          parcelId: id,
          user_id: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg) {
            window.location = "/user";
            toast.success(data.msg);
          }
        })
        .catch((err) => console.log(err));
    } else {
      window.location = "/user";
    }
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
    const table = profile.map((data) => {
      return (
        <tbody key={data.id}>
          <tr>
            <span>
              {" "}
              <button
                onClick={this.openModal}
                disabled={data.status === "cancelled" ? true : false}
              >
                {" "}
                Edit Destination
              </button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(subtitle) => (this.subtitle = subtitle)}>
                  Please enter A preferred destination
                </h2>
                <form onSubmit={() => this.handleEdit(data.id)}>
                  <button onClick={this.closeModal}>close</button>
                  <input
                    type="text"
                    value={this.state.destination}
                    onChange={this.handleChange}
                  />
                  <button>submit</button>
                </form>
              </Modal>{" "}
            </span>

            <th scope="row">{data.id}</th>
            <td>{data.pickup_location}</td>
            <td>{data.destination}</td>
            <td>{data.recipient_name}</td>
            <td>{data.recipient_phone_no}</td>
            <td>{data.status}</td>
            <button
              disabled={data.status === "cancelled" ? true : false}
              onClick={() => this.handleCancel(data.id)}
              className="btn btn-danger p-1 pri"
            >
              Cancel
            </button>
          </tr>
        </tbody>
      );
    });
    return (
      <div className="all">
        <div className="card" style={{ width: "20rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h5>Number of orders: {profile.length} </h5>{" "}
            </li>
            <li className="list-group-item">
              <h5>
                Orders in Transit:{" "}
                {profile.filter((data) => data.status === "in transit").length}{" "}
              </h5>
            </li>
            <li className="list-group-item">
              <h5>
                Delivered:{" "}
                {profile.filter((data) => data.status === "delivered").length}{" "}
              </h5>
            </li>
            <li className="list-group-item">
              <h5>
                Cancelled Orders:{" "}
                {profile.filter((data) => data.status === "cancelled").length}
              </h5>
            </li>
          </ul>
        </div>
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
