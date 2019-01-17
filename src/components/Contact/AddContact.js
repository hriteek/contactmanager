import React, { Component } from "react";
import { Consumer } from "../../context";
// import uuid from "uuid";
import TestInputGroup from "./TestInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {} //for error checker
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // check for error
    if (name === "") {
      this.setState({ error: { name: "This is required" } });
      return;
    }
    if (email === "") {
      this.setState({ error: { email: "This is requored" } });
      return;
    }
    if (phone === "") {
      this.setState({ error: { phone: "This is requored" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone,
      error: {}
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    this.setState({ name: "", email: "", phone: "", error: {} });

    this.props.history.push("/"); //this lines helps to redirect the page to the main root page when the add contact form is passed
  };
  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TestInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onChange}
                    error={error.name}
                  />
                  <TestInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={this.onChange}
                    error={error.email}
                  />
                  <TestInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={error.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-info"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
