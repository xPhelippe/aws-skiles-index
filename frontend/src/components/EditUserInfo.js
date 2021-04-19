import React, { Component } from "react";
import getAPIHost from './Environment';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default class EditUserInfo extends Component {
  constructor(props) {
    super(props);

    let UserData = localStorage.getItem("UserData");
    UserData = JSON.parse(UserData);

    this.state = {
      username: UserData.username,
      first_name: UserData.first_name,
      last_name: UserData.last_name,
      investment_type: UserData.investmentType,
      registrationErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getInvestmentType(type) {
    const risk = {
      '0': "Risk Averse",
      '1': "Risk Tolerant",
    }
    return risk[type]
  }

  updateUsername() {
    this.setState = this.props.username;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleRiskChange = (event) => {
    const risk = {
      "Risk Averse": 0,
      "Risk Tolerant": 1,
    }

    const newRisk = event.currentTarget.textContent;
    console.log(risk[newRisk])
    this.setState({
      investment_type: risk[newRisk]
    });
  }

  handleSubmit = () => {
    const {username, first_name, last_name, investment_type} = this.state;
    
    let data = new FormData();

    data.append('username', username)
    data.append('first_name', first_name)
    data.append('last_name', last_name)
    data.append('investment_type', investment_type)

    axios
      .post(getAPIHost() + "/change_user_info/",data)
      .then(response => {

        // grab previous user data
        let UserData = localStorage.getItem("UserData");
        UserData = JSON.parse(UserData);

        // update data with changes
        UserData["first_name"] = first_name;
        UserData["last_name"] = last_name;
        UserData["investmentType"] = investment_type;

        // push data back to loacl storage
        UserData = JSON.stringify(UserData);
        localStorage.setItem("UserData",UserData)

        this.props.history.push('/home');

      })
      .catch(error => {
        console.log("registration error", error);
      });

  }

  render() {
    return (
      <div>
        <br/>
        <h3 class="text-center">Edit Info<br/></h3>

        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="first_name"
                name="first_name"
                placeholder={this.state.first_name}
                value={this.state.first_name}
                onChange={this.handleChange}

            />
        </div>

        <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="last_name"
                name="last_name"
                placeholder={this.state.last_name}
                value={this.state.last_name}
                onChange={this.handleChange}
                
            />
        </div>

        <div className="form-group">
            <input
                className="form-control"
                type="investment_type"
                name="investment_type"
                placeholder={this.getInvestmentType(this.state.investment_type)}
                value={this.getInvestmentType(this.state.investment_type)}
                onChange={this.handleChange}
                
            />

            <DropdownButton className="btn-lg" id="dropdown-basic-button" variant="secondary" title="Investment Type" type="investment_type" name="investment_type">
              <Dropdown.Item onClick={this.handleRiskChange}>Risk Averse</Dropdown.Item>
              <Dropdown.Item onClick={this.handleRiskChange}>Risk Tolerant</Dropdown.Item>
            </DropdownButton>
        </div>

          <div className="form-group">
            <button onClick={this.handleSubmit} class="btn btn-warning btn-lg btn-block">Update</button>
          </div>
      </div>
    );
  }
}
