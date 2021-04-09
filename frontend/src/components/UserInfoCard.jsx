import React, { Component } from 'react';
import profile from '../images/profile.png';

class UserInfoCard extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div className="col mx-0">
            <div className="card" >
              <img className="card-img-top" style={{'width':'100%'}} src={profile} alt="Card" />
              <div className="card-body d-flex flex-column" >
                <h4 className="card-title">Hello, {this.props.firstName}</h4>
                <p className="card-text">Name: {this.props.firstName} {this.props.lastName}</p>
                <p className="card-text">Investment Type: {this.props.investmentType}</p>

                <a href="/" className="mt-auto btn btn-warning stretched-link">Log Out</a>
              </div>
            </div>
          </div>
        );
    }
}
 
export default UserInfoCard;






