
import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
// eslint-disable-next-line
import axios from "axios";

import Signup from "./SignUp";
import Login from "./Login";
import UserWatchlist from "../components/UserWatchlist";

import book from '../images/book.png'
import watch from '../images/watch.png'
import stockGraph from '../images/stockGraph.png'
import UserInfoCard from "../components/UserInfoCard";


class Home extends Component {
  constructor(props) {
    super(props);
    
    let UserData = localStorage.getItem("UserData")

    UserData = JSON.parse(UserData)

    console.log(UserData)

    this.state = {
      firstName: UserData.first_name,
      lastName: UserData.last_name,
      investmentType: UserData.investmentType,
      watchlist: UserData.watchlist
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

  getInvesmentType(userType) {
    const types = {
      0: "Risk Averse",
      1: "Risk Tolerant"
    };

    return types[userType];
  }

  render() {
    return (
      <div>
        <div className="Content">
            <img src={logo} className="App-logo" alt="logo" />

            <div className="row mb-0 mt-5 justify-content-center no-gutters">
              <div className="col mx-0">
                  <UserInfoCard firstName={this.state.firstName} lastName={this.state.lastName}
                  investmentType={this.getInvesmentType(this.state.investmentType)}/>
              </div>

              <div className="col mx-0">
                <UserWatchlist stockName={this.state.watchlist} />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;


