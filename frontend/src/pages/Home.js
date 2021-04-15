
import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
// eslint-disable-next-line
import axios from "axios";

import UserWatchlist from "../components/UserWatchlist";
import UserInfoCard from "../components/UserInfoCard";
import educationIcon from "../images/educationIcon.png";
import graphIcon from "../images/graphIcon.png";
import helpIcon from "../images/helpIcon.png";
import EditUserInfo from "../components/EditUserInfo";



class Home extends Component {
  constructor(props) {
    super(props);
    
    console.log('before user data in home')
    let UserData = localStorage.getItem("UserData")

    UserData = JSON.parse(UserData)

    console.log("constructor home")
    console.log(UserData)

    this.state = {
      firstName: UserData.first_name,
      lastName: UserData.last_name,
      username: UserData.username,
      investmentType: UserData.investmentType,
      watchlist: UserData.watchlist,
      viewEditUser : false
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.editUserInfo = this.editUserInfo.bind(this);

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

  editUserInfo() {
    /* this.setState({ viewEditUser: true }); */
    this.props.history.push('/edit-user');
  }

  render() {
    return (
      <div>
        <div className="Content">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <img className="App-logo" src={logo} alt="logo" />
            </a>

        <div className="row mb-0 mt-5 justify-content-center">
              <div className="col mx-0">
                  <UserInfoCard firstName={this.state.firstName} lastName={this.state.lastName}
                  investmentType={this.getInvesmentType(this.state.investmentType)}/>
                  <button onClick={this.editUserInfo} class="ml-3 btn btn-outline-light me-2"> Edit Info </button>

                  {/* {(this.state.viewEditUser) ? <EditUserInfo 
                    history={this.props.history} username={this.state.username} firstName={this.state.firstName} lastName={this.state.lastName} investmentType={this.state.investmentType}
                    /> : ''} */}
              </div>



              <div className="col mx-0">
                <UserWatchlist stockName={this.state.watchlist} user={this.state.username} history={this.props.history} />
              </div>

              <div className="col mx-0">
                <ul class="nav flex-column">
                  <li class="nav-item row">
                    <img src={graphIcon} className="Mini-aang" alt="mini-aang" />
                    <a class="nav-link text-light active" href="/graphs">Technical Indicator Graphs</a>
                  </li>

                  <li class="nav-item row">
                    <img src={educationIcon} className="Mini-aang" alt="mini-aang" />
                    <a class="nav-link text-light active" href="/education">Educational Material</a>
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


