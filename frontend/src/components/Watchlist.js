
import React, { Component } from 'react';
//import { CanvasJSChart } from 'canvasjs-react-charts';
import { getOverviewForSymbol } from '../components/ApiConnectorOverview';
import logo from '../images/greyLogoCropped.png';

import contacts from '../data/data.json';

class Watchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            priceToBook: '',
            priceEarningsToGrowth: '',
            priceToSales: '',
            shortRatio: '',
            count: 0,
        }
    }

    render() {
        return (
            // uncomment to use the state set by data from the api call
            //<span>PB: {this.getPB()}</span> 
            <div className="Content">
                <img src={logo} className="App-logo" alt="logo" />

                <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>P/B Ratio</th>
                            <th>P/E Ratio</th>
                            <th>PEG Ratio</th>
                            <th>P/S Ratio</th>
                            <th>Short Ratio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(e=> (
                            <tr key={e.id}>
                                <td>{e.Symbol}</td>
                                <td>{e.PriceToBookRatio}</td>
                                <td>{e.PERatio}</td>
                                <td>{e.PEGRatio}</td>
                                <td>{e.PriceToSalesRatioTTM}</td>
                                <td>{e.ShortRatio}</td>
                            </tr>
                        ))}
                    </tbody>

                </table> 
            </div>
        );
    }

    getPB() {
        const{priceToBook} = this.state;
        //this.fetchStockData('TSLA');
        return priceToBook;
    }

    formatCount() {
        const{count} = this.state;
        const x = <h1>Zero</h1>;
        return count === 0 ? x : count;
    }

    componentDidMount() {
        // uncomment to get api data instead, i'm using the json data i saved 
        //this.fetchStockData('TSLA');
        
    }
/*     
    fetchStockData = async (symbol) => {
        //const result = await getOverviewForSymbol(symbol);
        //console.log(result.data.FullTimeEmployees);
        //console.log(result.data.ShortRatio);
        this.setState({
            priceToBook: 2,
            priceEarningsToGrowth: result.data.PEGRatio,
            priceToSales: result.data.PriceToSalesRatio,
            shortRatio: result.data.ShortRatio,
        });
        
    }; */


};


export default Watchlist;
