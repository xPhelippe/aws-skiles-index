import React from 'react';
import featuresPage from '../../images/featuresPageHelp.png';
import loginIcon from '../../images/loginHelp.png';
import signupIcon from '../../images/signupHelp.png';
import tiCard from '../../images/tiCard.png';
import watchlistCard from '../../images/watchlistCard.png';
import educationCard from '../../images/educationCard.png';


function FeaturesPageHelp() {
    
        return (
            <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
            <thead class="thead-dark">
                <tr>
                    <th>Features Page</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th rowspan="6"><img src={featuresPage} className="Help-pages" alt="landing-page" /></th>
                    <th>Element</th>
                    <th>Description</th>
                </tr>
    
                <tr>
                    <td><img src={tiCard} className="Midi-aang" alt="navigation bar" /></td>
                    <td>Redirect to the Technical Indicator Graphs feature page at /graphs</td>
                </tr>
                <tr>
                    <td><img src={watchlistCard} className="Midi-aang" alt="navigation bar" /></td>
                    <td>Redirect to a sample Watchlist feature page at /watchlist</td>
                </tr>
                <tr>
                    <td><img src={educationCard} className="Midi-aang" alt="navigation bar" /></td>
                    <td>Redirect to the Educational Resources page at /education</td>
                </tr>
            </tbody>
        </table> 
        );
    
}

export default FeaturesPageHelp;