import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';

import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      registrationErrors: ""
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
      <div className="Content">
        <img className="App-logo" style={{'margin-bottom': '40px'}} src={logo} alt="Avatar"/>
        <h2 class="text-center">Create an Account<br/></h2>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="username"
                name="username"
                placeholder="Username"
                value={this.state.email}
                onChange={this.handleChange}
                required
            />
        </div>

        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="username"
                name="first_name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={this.handleChange}
                required
            />
        </div>

        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="username"
                name="first_name"
                placeholder="Last Name"
                value={this.state.last_name}
                onChange={this.handleChange}
                required
            />
        </div>
        

        <div className="form-group">
            <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
            />
        </div>

          <div className="form-group">
            <button type="submit" class="btn btn-warning btn-lg btn-block">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}