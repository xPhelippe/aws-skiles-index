import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
import UserWatchlist from "../components/UserWatchlist";
import UserInfoCard from "../components/UserInfoCard";
import educationIcon from "../images/educationIcon.png";
import graphIcon from "../images/graphIcon.png";
import helpIcon from "../images/helpIcon.png";


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
    this.editUserInfo = this.editUserInfo.bind(this);
  }


  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  getInvesmentType(userType) {
    const types = {
      0: "Risk Averse",
      1: "Risk Tolerant"
    };

    return types[userType];
  }

  editUserInfo() {
    this.props.history.push('/edit-user');
  }

  render() {
    return (
      <div>
        <div className="Content">
            <a href="/">
              <img className="App-logo" src={logo} alt="logo" />
            </a>

        <div className="row mb-0 mt-5 justify-content-center">
              <div className="col ml-5 container">
                  <UserInfoCard firstName={this.state.firstName} lastName={this.state.lastName}
                  investmentType={this.getInvesmentType(this.state.investmentType)}/>
                  <button onClick={this.editUserInfo} class="ml-4 btn btn-outline-light me-2"> Edit Info </button>
              </div>



              <div className="col mr-4">
                <UserWatchlist stockName={this.state.watchlist} user={this.state.username} history={this.props.history} />
              </div>

              <div className="col mx-0 ml-4">
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


