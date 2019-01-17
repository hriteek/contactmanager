import React, { Component } from "react";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = e => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    let contactInfo = null;
    if (showContactInfo) {
      contactInfo = (
        <ul className="list-group">
          <li className="list-group-item">Email : {email}</li>
          <li className="list-group-item">Phone no. : {phone}</li>
        </ul>
      );
    }

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div
              className="card card-body mb-3 ml-auto mr-auto"
              style={{ width: "60%" }}
            >
              <h1 className="card-title">
                {name}{" "}
                <i
                  onClick={this.onShowClick}
                  className="fa fa-sort-down"
                  style={{ cursor: "pointer", color: "rgb(23,162,184)" }}
                />
                <i
                  className="fa fa-times"
                  onClick={() => this.onDeleteClick(id, dispatch)}
                  style={{ cursor: "pointer", color: "red", float: "right" }}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      color: "black",
                      float: "right",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h1>
              {contactInfo}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Contact;
