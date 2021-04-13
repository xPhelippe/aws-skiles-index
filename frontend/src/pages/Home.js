
import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
// eslint-disable-next-line
import axios from "axios";

import UserWatchlist from "../components/UserWatchlist";
import UserInfoCard from "../components/UserInfoCard";
import educationIcon from "../images/educationIcon.png";
import graphIcon from "../images/graphIcon.png";
import helpIcon from "../images/helpIcon.png";



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

            

        <div className="row mb-0 mt-5 justify-content-center">
              <div className="col mx-0">
                  <UserInfoCard firstName={this.state.firstName} lastName={this.state.lastName}
                  investmentType={this.getInvesmentType(this.state.investmentType)}/>
              </div>



              <div className="col mx-0">
                <UserWatchlist stockName={this.state.watchlist} />
              </div>

              <div className="col mx-0">
                <ul class="nav flex-column">
                  <li class="nav-item row">
                    <img src={graphIcon} className="Mini-aang" alt="mini-aang" />
                    <a class="nav-link text-light active" href="/graphs">Graphs</a>
                  </li>

                  <li class="nav-item row">
                    <img src={educationIcon} className="Mini-aang" alt="mini-aang" />
                    <a class="nav-link text-light active" href="/graphs">Educational Material</a>
                  </li>

                  <li class="nav-item row">
                    <img src={helpIcon} className="Mini-aang" alt="mini-aang" />
                    <a class="nav-link text-light active" href="/help">Help</a>
                  </li>

                </ul>
              </div>



          </div>
        </div>
      </div>
    );
  }
}

export default Home;


