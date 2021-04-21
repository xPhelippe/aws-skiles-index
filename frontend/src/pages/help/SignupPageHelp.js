import React from 'react';
import signupPage from '../../images/signupPageHelp.png';
import signupField from '../../images/signupFields.png';
import signupButton from '../../images/signupButton.png';


/**
 * SignupPageHelp.js
 * Purpose: Display the Signup Page table on /help
 * @author Elisa Rexinger
*/

function SignupPageHelp() {
    return (
        <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
            <thead class="thead-dark">
                <tr>
                    <th>Sign Up Page</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th rowspan="6"><img src={signupPage} className="Help-pages" alt="landing-page" /></th>
                    <th>Element</th>
                    <th>Description</th>
                </tr>
    
                <tr>
                    <td><img src={signupField} className="Midi-aang" alt="navigation bar" /></td>
                    <td>Text-fields for new users to enter their username, first and last name, and password</td>
                </tr>

                <tr>
                    <td><img src={signupButton} className="Mini-aang" alt="navigation bar" /></td>
                    <td>Clicking will create an account for the new user and redirect to their homepage at /home</td>
                </tr>
            </tbody>
        </table> 
    );
    
}

export default SignupPageHelp;