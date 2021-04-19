import React, { Component } from 'react';
import { getOverviewForSymbol } from './ApiConnectorOverview';
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
            <div className="Content">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img className="App-logo" src={logo} alt="logo" />
                </a>

                <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
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

                <div className="form-group">
                    <a href="/features" className="btn btn-outline-light me-2 text-light">Back</a>            
                </div>
            </div>
        );
    }

    getPB() {
        const{priceToBook} = this.state;
        return priceToBook;
    }

    formatCount() {
        const{count} = this.state;
        const x = <h1>Zero</h1>;
        return count === 0 ? x : count;
    }

    fetchStockData = async (symbol) => {
        const result = await getOverviewForSymbol(symbol);
        console.log(result.data);
        this.setState({
            priceToBook: 2,
            priceEarningsToGrowth: result.data.PEGRatio,
            priceToSales: result.data.PriceToSalesRatio,
            shortRatio: result.data.ShortRatio,
        });
    };
};


export default Watchlist;
