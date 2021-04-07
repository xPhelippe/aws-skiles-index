
import React, { Component } from 'react';
//import { CanvasJSChart } from 'canvasjs-react-charts';
import { getOverviewForSymbol } from './ApiConnectorOverview';
import logo from '../images/greyLogoCropped.png';

import contacts from '../data/data.json';

class UserWatchlist extends Component {
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

    stockTicker = {
        "TSLA": 0,
        1: "AAPL",
        2: "WKHS",
        3: "ABR" 
    }
    
    look() {
        console.log(this.props.stockName)
        console.log(contacts[this.stockTicker.TSLA].ShortRatio)
    }
   

    render() {
        return (
            // uncomment to use the state set by data from the api call
            //<span>PB: {this.getPB()}</span> 
            <div className="Content">
                <div>{this.look()}</div>
                {/* <h1>{this.props.stockName[1].stock.ticker}</h1> */}
                <div>{this.props.stockName.map((item, index) => (<h1>{item.stock.ticker}</h1>))}</div>
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


export default UserWatchlist;
