import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
import axios from "axios";
import getAPIHost from '../components/Environment'
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
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
    const { username, password } = this.state;
    const params = {
      "username": username,
      "password": password
    }

    let Json = JSON.stringify(params)
    //Json = JSON.parse(Json)
    console.log(Json);

    const querystring = require('querystring');
   
    
      axios
      .post(
        getAPIHost() + "/login/", querystring.stringify(
        {
          "username":username,
          "password":password,
        })
                
      )
      .then(response => {

      //this.props.handleSuccessfulAuth(response.data);
        
        
        console.log(response.data)
        localStorage.setItem("UserData", JSON.stringify(response.data))

        this.props.history.push('/home');
        
      })
      .catch(error => {
        console.log("login error", error);
      });

      //event.preventDefault();
      
  }


  render() {
    return (
        <div className="Content">
			<img className="App-logo" style={{'margin-bottom': '50px'}} src={logo} alt="Avatar"/>
            <h2 class="text-center margin-40">Member Login</h2>
                <div>
                   {/* <form onSubmit={this.handleSubmit} method="POST"> */}
                    <div className="form-group" style={{'margin-top': '25px'}}>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required="required"
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
                            required="required"
                        />
                    </div>
        
                    <div className="form-group">
                        <button onClick={this.handleSubmit} class="btn btn-warning btn-lg btn-block"> Sign In </button>
                    </div>
            </div>
        </div>
    );
  }
}

