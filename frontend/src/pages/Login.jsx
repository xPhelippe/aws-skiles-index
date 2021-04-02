import React, { Component } from "react";
import logo from '../images/greyLogoCropped.png';
import axios from "axios";

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

  handleSubmit(event) {
    const { username, password } = this.state;
// TODO: put in correct api connection
/*     axios
      .post(
        "<api location it's posting to>",
        {
          user: {
            username: username,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      }); */
    event.preventDefault();
  }

  render() {
    return (
        <div className="Content">
			<img className="App-logo" style={{'margin-bottom': '50px'}} src={logo} alt="Avatar"/>
            <h2 class="text-center margin-40">Member Login</h2>
                <div>
                    <form onSubmit={this.handleSubmit}>
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
                        <button type="submit" class="btn btn-warning btn-lg btn-block">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}

