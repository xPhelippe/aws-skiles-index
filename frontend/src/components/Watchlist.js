import React, { Component } from 'react';
import getAPIHost from "./Environment"
import axios from 'axios';
import logo from '../images/greyLogoCropped.png';

/**
 * Watchlist.js
 * Purpose: Create watchlist component to show popular stock market ratios for all available stocks in the database
 * @author Phelippe Souza-Herod
 * @author Elisa Rexinger
 */

class Watchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            // list of all available stocks saved in the database
            stockName: ["TSLA", "AAPL", "ABR", "WKHS", "XOM", "CVX", "SHW"]
        };
    }

    // On component mount, call fetchStockRatio for each stock in the state array stockName
    componentDidMount() {
        this.state.stockName.map(item => (
            this.fetchStockRatio(item)
        ))
        this.fetchStockTicker();
    }

    // Use /get_all_tickers endpoint to update the available stocks offered in the "add/remove from watchlist menu" to reflect the stocks in the database
    fetchStockTicker = async () => {
        axios
        .get(
          getAPIHost() + '/get_all_tickers'
        )
        .then(response => {
          this.setState({stock_list: response.data.tickers});
          
        })
        .catch(error => {
          console.log("stock api call error", error);
        });
    };

    /**
     * Receive a stocks overview data using the /get_stock_overview endpoint
     * @param ticker Name of stock ticker to receive overview information for
    */
    fetchStockRatio = async (ticker) => {
        let data = new FormData();
        data.append('ticker', ticker)

        axios
        .post(getAPIHost() + "/get_stock_overview/", data)

        .then(response => {
          
          this.setState({stocks: [...this.state.stocks,{
            ticker: response.data.ticker,
            PriceToBookRatio: response.data.PriceToBookRatio,
            PERatio: response.data.PERatio,
            PEGRatio: response.data.PEGRatio,
            PriceToSalesRatioTTM: response.data.PriceToSalesRatioTTM,
            ShortRatio: response.data.ShortRatio
          }]})
        })
        .catch(error => {
          console.log("stock api call error", error);
        });
    };


    render() {
        return (
            <div className="Content">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img className="App-logo" src={logo} alt="logo" />
                </a>
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
                        {this.state.stocks.map(item=> (
                            <tr key={item.id}>
                                <td>{item.ticker}</td>
                                <td>{item.PriceToBookRatio}</td>
                                <td>{item.PERatio}</td>
                                <td>{item.PEGRatio}</td>
                                <td>{item.PriceToSalesRatioTTM}</td>
                                <td>{item.ShortRatio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="form-group">
                    <a href="/features" className="btn btn-outline-light me-2 text-light">Back</a>            
                </div>

            </div>
        );
    }
};


export default Watchlist;
