import React, { Component } from 'react';
import GenerateGraphs from '../components/GenerateGraphs';
import logo from '../images/greyLogoCropped.png';
import GraphTestConnection from '../components/GraphTestConnection';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import miniAang from '../images/miniAang.png';
import navBar from '../images/navBar.png';
import landingPage from '../images/landingPageHelp.png';




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

                <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
                    <thead class="thead-dark">
                        <tr>
                            <th rowspan="2"><img src={landingPage} className="Help-pages" alt="landing-page" /></th>
                            <th rowspan="2">Utilities Company</th>
                            <th colspan="3">Info Here</th>
                        </tr>
                        <tr>
                            <th>data1</th>
                            <th>data2</th>
                            <th>data3</th>
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


                
                   
               
                

                
            </div>
        );
    }
}
 
export default Help;
