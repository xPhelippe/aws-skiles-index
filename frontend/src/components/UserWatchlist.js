
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

    getDataIndex(ticker) {
        const stockTicker = {
            "TSLA": 0,
            "AAPL": 1,
            "WKHS": 2,
            "ABR": 3,
            "GOOGL": 4
        }

        const index = Number(stockTicker[ticker]);
        console.log(index);
        return index;
    }


    render() {
        return (
            // uncomment to use the state set by data from the api call
            //<span>PB: {this.getPB()}</span> 
            <div className="Content">
{/*                 <div>{this.props.stockName.map((item, index) => (<h1>{item.stock.ticker}</h1>))}</div>
 */}

                <table className="table table-striped text-white" >
                    <thead class="thead-dark">
                        <tr>
                            <th>Watchlist</th>
                        </tr>
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
                        {this.props.stockName.map(item=> (
                            <tr key={item.id}>
                                <td>{contacts[this.getDataIndex(item.stock.ticker)].Symbol}</td>
                                <td>{contacts[this.getDataIndex(item.stock.ticker)].PriceToBookRatio}</td>
                                <td>{contacts[this.getDataIndex(item.stock.ticker)].PERatio}</td>
                                <td>{contacts[this.getDataIndex(item.stock.ticker)].PEGRatio}</td>
                                <td>{contacts[this.getDataIndex(item.stock.ticker)].PriceToSalesRatioTTM}</td>
                                <td>{contacts[this.getDataIndex(item.stock.ticker)].ShortRatio}</td>
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
