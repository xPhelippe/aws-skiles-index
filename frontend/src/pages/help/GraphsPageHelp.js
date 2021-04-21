import React from 'react';
import graphsPage from '../../images/graphsPageHelp.png';
import graph from '../../images/graph.png';
import graphStockTicker from '../../images/graphStockTicker.png';
import graphTI from '../../images/graphTI.png';



function GraphsPageHelp() {
    
        return (
            <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
            <thead class="thead-dark">
                <tr>
                    <th>Graphs Page</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th rowspan="6"><img src={graphsPage} className="Help-pages" alt="landing-page" /></th>
                    <th>Element</th>
                    <th>Description</th>
                </tr>
    
                <tr>
                    <td><img src={graph} className="Maxi-aang" alt="navigation bar" /></td>
                    <td>Visualization of user's chosen stock for their selected technical indicator</td>
                </tr>

                <tr>
                    <td><img src={graphStockTicker} className="Maxi-aang" alt="navigation bar" /></td>
                    <td>Dropdown menu presents available stocks that users can view. CLicking a menu item will regenerate the graph to match the stock to the technical indicator selected</td>
                </tr>

                <tr>
                    <td><img src={graphTI} className="Maxi-aang" alt="navigation bar" /></td>
                    <td>Dropdown menu presents available technical indicators that users can view. CLicking a menu item will regenerate the graph to match the stock to the technical indicator selected</td>
                </tr>
                
            </tbody>
        </table> 
        );
    
}

export default GraphsPageHelp;