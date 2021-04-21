import React from 'react';
import loginPage from '../../images/loginPageHelp.png';
import loginFields from '../../images/loginFields.png';
import loginSignin from '../../images/loginSignin.png';


/**
 * LoginPageHelp.js
 * Purpose: Display the Login Page table on /help
 * @author Elisa Rexinger
*/

function LoginPageHelp() {
    
        return (
            <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
                <thead class="thead-dark">
                    <tr>
                        <th>Login Page</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th rowspan="6"><img src={loginPage} className="Help-pages" alt="landing-page" /></th>
                        <th>Element</th>
                        <th>Description</th>
                    </tr>
        
                    <tr>
                        <td><img src={loginFields} className="Midi-aang" alt="navigation bar" /></td>
                        <td>Text-fields for existing users to enter their username and password</td>
                    </tr>

                    <tr>
                        <td><img src={loginSignin} className="Mini-aang" alt="navigation bar" /></td>
                        <td>Clicking will log in the user and redirect to their homepage at /home</td>
                    </tr>
                </tbody>
            </table> 
        );
    
}

export default LoginPageHelp;