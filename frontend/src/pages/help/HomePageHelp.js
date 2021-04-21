import React from 'react';
import homePage from '../../images/homePageHelp.png';
import helpHome from '../../images/helpHome.png';
import educationHome from '../../images/educationHome.png';
import tiHome from '../../images/tiHome.png';
import editInfo from '../../images/editInfo.png';
import logout from '../../images/logout.png';
import watchlist from '../../images/watchlistHelp.png';


/**
 * HelpPageHelp.js
 * Purpose: Display the Help Page table on /help
 * @author Elisa Rexinger
*/

function HomePageHelp() {
    return (
        <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
            <thead class="thead-dark">
                <tr>
                    <th>Home Page</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th rowspan="7"><img src={homePage} className="Help-pages" alt="landing-page" /></th>
                    <th>Element</th>
                    <th>Description</th>
                </tr>
    
                <tr>
                    <td><img src={logout} className="Mini-aang" alt="navigation bar" /></td>
                    <td>Log out user and redirects to landing page</td>
                </tr>

                <tr>
                    <td><img src={editInfo} className="Mini-aang" alt="navigation bar" /></td>
                    <td>Displays form to edit first name, last name, and investment type</td>
                </tr>

                <tr>
                    <td><img src={tiHome} className="Mini-aang" alt="navigation bar" /></td>
                    <td>Redirects to the interactive stock indicator visualization feature at /graphs</td>
                </tr>

                <tr>
                    <td><img src={educationHome} className="Mini-aang" alt="navigation bar" /></td>
                    <td>Redirects to the Educational Resources page at /education</td>
                </tr>

                <tr>
                    <td><img src={helpHome} className="Mini-aang" alt="navigation bar" /></td>
                    <td>Redirects to Help page at /help</td>
                </tr>

                <tr>
                    <td><img src={watchlist} className="Maxi-aang" alt="navigation bar" /></td>
                    <td>Watchlist features displays popular ratios for their favorite stocks list.
                        Users can add and remove stocks from their watchlist by selecting the stock ticker from the "Add Stock" and "Remove Stock" drop down buttons below the watchlist.
                    </td>
                </tr>
            </tbody>
        </table> 
    );
    
}

export default HomePageHelp;