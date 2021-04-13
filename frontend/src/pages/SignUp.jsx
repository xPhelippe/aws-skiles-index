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
      registrationErrors: "",
      investment_type: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    const { username, password, first_name, last_name } = this.state;

    const querystring = require('querystring');

     axios
      .post(
        "http://127.0.0.1:8000/create_user/",querystring.stringify(
          {
            "username":username,
            "password":password,
            "first_name":first_name,
            "last_name":last_name
          })
      )
      .then(response => {

        localStorage.setItem("UserData", JSON.stringify(response.data["userData"]))
        this.props.history.push('/home');

        
      })
      .catch(error => {
        console.log("registration error", error);
      }); 
  }

  render() {
    return (
      <div className="Content">
        <img className="App-logo" style={{'margin-bottom': '40px'}} src={logo} alt="Avatar"/>
        <h2 class="text-center">Create an Account<br/></h2>
        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="username"
                name="username"
                placeholder="Username"
                value={this.state.username}
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
                name="last_name"
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
            <button onClick={this.handleSubmit} class="btn btn-warning btn-lg btn-block">Sign Up</button>
          </div>
      </div>
    );
  }
}