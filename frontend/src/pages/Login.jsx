import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
import axios from "axios";
import {withRouter} from 'react-router-dom';

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
        "http://127.0.0.1:8000/login/", querystring.stringify(
        {
          "username":username,
          "password":password,
        })
                
      )
      .then(response => {

      //this.props.handleSuccessfulAuth(response.data);
        
        
        console.log(response.data)
        localStorage.setItem("UserData", JSON.stringify(response.data))


        
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
        
                    <div class="form-group">
                        <button /* type="submit" */ onClick={this.handleSubmit} class="btn btn-warning btn-lg btn-block"> Sign In </button>
                    </div>
                    <div>
                      <button class="btn btn-warning btn-lg btn-block"><a href='/home' style={{'color':'black'}}> Proceed</a> </button>
                    </div>
                  {/* </form> */}
            </div>
        </div>
    );
  }
}

