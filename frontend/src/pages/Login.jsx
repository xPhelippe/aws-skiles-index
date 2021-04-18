import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
import axios from "axios";
import getAPIHost from '../components/Environment';


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

    let data = new FormData();

    data.append('username',username)
    data.append('password',password)
   
    
    axios
      .post(getAPIHost() + "/login/", data)
      .then(response => {        
        
        console.log(response.data)
        localStorage.setItem("UserData", JSON.stringify(response.data))

        this.props.history.push('/home');
        
      })
      .catch(error => {
        console.log("login error", error);
      });
  }


  render() {
    return (
        <div className="Content">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <img className="App-logo" src={logo} alt="logo" />
            </a>

            <h2 class="text-center margin-40" style={{'margin-top': '25px'}}>Member Login</h2>
                <div>
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

