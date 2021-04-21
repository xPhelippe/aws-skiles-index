import React, { Component } from 'react';
import GenerateGraphs from '../components/GenerateGraphs';
import logo from '../images/greyLogoCropped.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";
import getAPIHost from '../components/Environment'


/**
 * Graphs.js
 * Purpose: Create technical indicator graphs
 * @author Elisa Rexinger
*/

class Graphs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stock_ticker: "TSLA",
            technical_indicator: "RSI",
            is_updated: false,
            stock_list: [],
        };
    }

    // On component mount, call fetchStockTicker()
    componentDidMount() {
        this.fetchStockTicker();
    }

    // Provide list of available stocks in the database using the /get_all_tickers endpoint
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
     * Update technical_indicator state to match user selection
     * @param e event from user selecting a stock ticker to graph
    */
    setStockTicker = (e) => {
        this.setState({stock_ticker: e.currentTarget.textContent});
        this.setState({is_updated: !this.state.is_updated})

    }

    /**
     * Update stock_ticker state to match user selection
     * @param e event from user selecting a technical indicator to graph
    */
    setTechnicalIndicator = (e) => {
        if(e.currentTarget.textContent === 'Time Series') {
            this.setState({technical_indicator: 'daily_adjusted'});
        }
        else this.setState({technical_indicator: e.currentTarget.textContent});
        this.setState({is_updated: !this.state.is_updated})
    }

    /**
     * Decide the customized display of the educational material page
     * @returns User the educational component corresponding to the user's risk type
    */
    getTechnicalIndicator() {
        if(this.state.stock_ticker === "SHW") return ["SMA","Time Series"]
        return ["RSI", "SMA", "VWAP", "Time Series"];
    }


    render() { 
        return (
            <div className="Content">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img className="App-logo" src={logo} alt="logo" />
                </a>

                <div className="p-2">
                    <GenerateGraphs key={this.state.is_updated} ticker={this.state.stock_ticker} data_type_name={this.state.technical_indicator}/>
                </div>
                    <div class="d-flex justify-content-between p-3">
                        <div className="row ">
                            <div className="col">
                            <DropdownButton id="dropdown-basic-button" variant="secondary" title="Stock Ticker">
                                {this.state.stock_list.map(item=> (
                                    <Dropdown.Item onClick={this.setStockTicker}>{item}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                            </div>
                                
                            <div class="col">
                            <DropdownButton id="dropdown-basic-button" variant="secondary" title="Technical Indicator">
                                {this.getTechnicalIndicator().map(item=> (
                                    <Dropdown.Item onClick={this.setTechnicalIndicator}>{item}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
 
export default Graphs;






































/* import Chart from '../components/TimeSeries';
import SMA from '../components/SMA';
import VWAP from '../components/VWAP';
import RSI from '../components/RSI';
import logo from '../images/greyLogoCropped.png';


const Graphs = () => {
    return (
        <div className="Content">
            <img className="App-logo" src={logo} alt="Card" />
            <div >
                
                <div className="mt-3 p-3 border border-light rounded" style={{'width':'650px'}}>
                    <h4>Sample Technical Indicator Graphs for TSLA</h4>
                </div>
                    
                <div>_________________________________________________________________________________________________</div>
                
                <Chart />
                100 Days of TSLA Time Series Data
                 <SMA />
                Simple Moving Average (SMA) for TSLA
                <VWAP />
                Volume Weighted Average Price (VWAP) for TSLA
                <RSI />
                Relative Strength Index (RSI) for TSLA
            </div>
        </div>
    );
}
 
export default Graphs; */