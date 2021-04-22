import React, { Component } from "react";
import getAPIHost from '../components/Environment';
import logo from '../images/greyLogoCropped.png';
import axios from "axios";
import Form from 'react-bootstrap/Form'


/**
 * SignUp.js
 * Purpose: Component for user sign up
 * @author Phelippe Souza-Herod
 * @author Elisa Rexinger
*/

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      investment_type: "",
      not_accepted: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Update state to match user input
  */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Send new user's account information using the /create_user/ endpoint
  */
  handleSubmit = () => {
    const { username, password, first_name, last_name, not_accepted } = this.state;

    /* Testing input:
    REQ-1: Username Input
    Usernames can only contain alphanumeric characters (letters A-Z and
    numbers 0-9) with a maximum of 15 letters.

    REQ-2: Password Input
    Passwords must be a minimum of 8 characters. The characters must be at
    least 1 of each of the following categories: upper case letters (A-Z), lower case letters (a-z), numbers (0-9), and symbols (~`! @#$%^&*()_-+={[}]|\:;"'<,>.?/”)
    */
    var special_characters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var capital_characters = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    var lower_characters = /[abcdefghijklmnopqrstuvwxyz]/;
    var number_characters = /[0123456789]/;
    var username_invalid_prompt = "Usernames can only contain alphanumeric characters (letters A-Z and numbers 0-9) with a maximum of 15 letters.\n";
    var password_invalid_prompt = "Passwords must be a minimum of 8 characters. The characters must be at least 1 of each of the following categories: upper case letters (A-Z), lower case letters (a-z), numbers (0-9), and a special character\n";


    if(special_characters.test(username)){
      alert(username_invalid_prompt + '\nInvalid Input: Username must only contain alphanumeric characters');
      return;
    }

    if(username.length > 15) {
      alert(username_invalid_prompt + '\nInvalid Input: Username cannot exceed 15 characters');
      return;
    }

    if(password.length < 7) {
      alert(password_invalid_prompt + '\nInvalid Input: Password must be at least 8 characters long');
      return;
    }

    if(!special_characters.test(password)){
      alert(password_invalid_prompt + '\nInvalid Input: Password must contain a special character');
      return;
    }

    if(!capital_characters.test(password)){
      alert(password_invalid_prompt + '\nInvalid Input: Password must contain an upper case character');
      return;
    }

    if(!lower_characters.test(password)){
      alert(password_invalid_prompt + '\nInvalid Input: Password must contain a lower case character');
      return;
    }

    if(!number_characters.test(password)){
      alert(password_invalid_prompt + '\nInvalid Input: Password must contain a number');
      return;
    }

    if(not_accepted) {
      alert('Must Accept User Agreement');
      return;      
    }


    let data = new FormData();
    
    data.append('username',username)
    data.append('password',password)
    data.append('first_name',first_name)
    data.append('last_name',last_name)

     axios
      .post(getAPIHost() + "/create_user/",data)
      .then(response => {

        localStorage.setItem("UserData", JSON.stringify(response.data["userData"]))
        this.props.history.push('/home');
      })
      .catch(error => {
        console.log("registration error", error);
      }); 
  }

  checked = () => {
    this.setState({not_accepted: !this.state.not_accepted})
   }

  render() {
    return (
      <div className="container Content">
      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
        <img className="App-logo" src={logo} alt="logo" />
      </a>

      <h2 class="text-center" style={{'margin-top': '25px'}}>Create an Account<br/></h2>


      <div className="row mb-1 mt-4 justify-content-center">
        <div className="col mx-0">
          <div className="form-group" style={{'margin-top': '25px'}}>
            <input
                className="form-control"
                type="username"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
            />
        </div>

        <div className="form-group">
            <input
                className="form-control"
                type="username"
                name="first_name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={this.handleChange}
                required
            />
        </div>

        <div className="form-group">
            <input
                className="form-control"
                type="username"
                name="last_name"
                placeholder="Last Name"
                value={this.state.last_name}
                onChange={this.handleChange}
                required
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
                required
            />
        </div>

        <div className="form-group">
          <button onClick={this.handleSubmit} class="btn btn-warning btn-lg btn-block">Sign Up</button>
        </div>
      </div>

        <div className="col">
          <div className="form-group border px-3 pt-3" style={{'margin-top': '25px', 'width': '300px'}}>
              <div>I understand and accept that The Skiles Index is not responsible for any and all personal loss, damage, or harm (including financial loss) that may result from using this application.</div>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check className="pt-3" type="checkbox" label="I Agree" onChange={this.checked.bind(this)}/>
              </Form.Group>
          </div>  
        </div>

      </div>
    </div>
    );
  }
}
