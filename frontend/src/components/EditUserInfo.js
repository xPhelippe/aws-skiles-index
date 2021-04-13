import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';

import axios from "axios";

export default class EditUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      investment_type: "",
      registrationErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { username, password, password_confirmation } = this.state;

//TODO
/*     axios
      .post(
        "<put in correct api connection>",
        {
          user: {
            username: username,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration error", error);
      }); */
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <br/>
        <h3 class="text-center">Edit Info<br/></h3>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="username"
                name="username"
                placeholder={this.props.username}
                value={this.state.username}
                onChange={this.handleChange}
            />
        </div>

        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="first_name"
                name="first_name"
                placeholder={this.props.firstName}
                value={this.state.first_name}
                onChange={this.handleChange}

            />
        </div>

        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="username"
                name="first_name"
                placeholder={this.props.lastName}
                value={this.state.last_name}
                onChange={this.handleChange}
                
            />
        </div>

        <div className="form-group">
            <input
                className="form-control"
                type="investment-type"
                name="investment-type"
                placeholder={this.props.investmentType}
                value={this.state.investment_type}
                onChange={this.handleChange}
                
            />
        </div>

          <div className="form-group">
            <button type="submit" class="btn btn-warning btn-lg btn-block">Update</button>
          </div>
        </form>
      </div>
    );
  }
}