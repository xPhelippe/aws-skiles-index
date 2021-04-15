import React from 'react';
import aboutPage from '../../images/aboutPageHelp.png';
import loginIcon from '../../images/loginHelp.png';
import signupIcon from '../../images/signupHelp.png';
import featuresIcon from '../../images/featuresHelp.png';
import aboutusIcon from '../../images/aboutusHelp.png';
import text from '../../images/aboutUsText.png';


function AboutPageHelp() {
    
        return (
            <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
            <thead class="thead-dark">
                <tr>
                    <th>About Page</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th rowspan="6"><img src={aboutPage} className="Help-pages" alt="landing-page" /></th>
                    <th>Element</th>
                    <th>Description</th>
                </tr>
    
                <tr>
                    <td><img src={text} className="Midi-aang" alt="navigation bar" /></td>
                    <td>A description of the Skiles Index application is presented on this page</td>
                </tr>
            </tbody>
        </table> 
        );
    
}

export default AboutPageHelp;