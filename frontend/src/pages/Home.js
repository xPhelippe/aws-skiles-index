
import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
// eslint-disable-next-line
import axios from "axios";

import Signup from "./SignUp";
import Login from "./Login";

class Home extends Component {
  constructor(props) {
    super(props);
    
    let UserData = localStorage.getItem("UserData")

    UserData = JSON.parse(UserData)

    console.log(UserData)

    this.state = {
      first_name: UserData.first_name,
      last_name: UserData.last_name
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

//TODO: Change this to the proper api call
handleLogoutClick() {
    //TODO: Change this to the proper api call
    /*
    axios
       .delete("back-end connection", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      }); */
  } 

  render() {
    return (
      <div>
        <div className="Content">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Welcome to the Skiles Index!</h1>

            <h1>Home</h1>
            <h1>First Name: {this.state.first_name}</h1>
            <h1>Last Name: {this.state.last_name}</h1>
            <button onClick={() => this.handleLogoutClick()} type="button" class="btn btn-warning" style={{'margin':'20px'}}><a href="/" class="text-white">Log Out</a></button>        
        </div>

      </div>
    );
  }
}

export default Home;


