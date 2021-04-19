import React, { Component } from 'react';
import logo from '../../images/greyLogoCropped.png';
import miniAang from '../../images/miniAang.png';
import navBar from '../../images/navBar.png';
import LandingPageHelp from './LandingPageHelp';
import LoginPageHelp from './LoginPageHelp';
import SignupPageHelp from './SignupPageHelp';
import AboutPageHelp from './AboutPageHelp';
import FeaturesPageHelp from './FeaturesPageHelp';
import HomePageHelp from './HomePageHelp';
import EditUserPageHelp from './EditUserPageHelp';
import GraphsPageHelp from './GraphsPageHelp';

class Help extends Component {
    render() { 
        return (
            <div className="Content">
                <a href="/">
                    <img className="App-logo" src={logo} alt="logo" />
                </a>

                <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
                    <thead class="thead-dark">
                        <tr>
                            <th>Key Links</th>
                        </tr>

                        <tr>
                            <th>Image</th>
                            <th>Location</th>
                            <th>Function</th>
                            <th>Input</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={logo} className="Mini-aang" alt="logo" /></td>
                            <td>Top and center of each page</td>
                            <td>Redirects to the landing page</td>
                            <td>Clicking the image</td>
                            <td>Redirection to landing page</td>
                        </tr>

                        <tr>
                            <td><img src={miniAang} className="Mini-aang" alt="mini-aang" /></td>
                            <td>Left-most icon on navigation bar</td>
                            <td>Redirects to home page</td>
                            <td>Clicking the icon</td>
                            <td>Redirection to home page</td>
                        </tr>

                        <tr>
                            <td><img src={navBar} className="Mini-aang" alt="navigation bar" /></td>
                            <td>Top left of every page</td>
                            <td>Contains links to main features, expounded below</td>
                            <td>Clicking desired link text</td>
                            <td>Redirection to page corresponding to link text</td>
                        </tr>
                    </tbody>
                </table>

                <LandingPageHelp />
                <LoginPageHelp />
                <SignupPageHelp />
                <FeaturesPageHelp />
                <AboutPageHelp />
                <HomePageHelp />
                <EditUserPageHelp />
                <GraphsPageHelp />
                
            </div>
        );
    }
}
 
export default Help;
