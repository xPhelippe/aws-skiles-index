import React, { Component } from 'react';
import GenerateGraphs from '../components/GenerateGraphs';
import logo from '../images/greyLogoCropped.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";
import getAPIHost from '../components/Environment'


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

    componentDidMount() {
        this.fetchStockTicker();
    }



    fetchStockTicker = async () => {
        /* const result = getGraphTest(); */
        axios
        .get(
          /* getAPIHost() + '/stocks/SMA/TSLA?start_time=2021-01-1&end_time=2021-04-12' */   
          getAPIHost() + '/get_all_tickers'
        )
        .then(response => {
        
        //this.props.handleSuccessfulAuth(response.data);
          
          //console.log('in axios call - graph test');
          //console.log(response.data.tickers);   
          //console.log(response.data.RSI[4]);
          const answer = response.data.tickers;
          console.log(answer);
          this.setState({stock_list: answer});
          return answer;
          
        })
        .catch(error => {
          console.log("stock api call error", error);
        });


        //console.log(result);

        //console.log(result.data);
        //setStockData(formatStockData(result['SMA']));
        //console.log(stockData)
    };



    setStockTicker = (e) => {
        //console.log(this.fetchStockTicker());
        this.fetchStockTicker();
        //console.log(this.fetchStockTicker());
        this.setState({stock_ticker: e.currentTarget.textContent});
        this.setState({is_updated: !this.state.is_updated})
    }

    setTechnicalIndicator = (e) => {
        this.fetchStockTicker();
        if(e.currentTarget.textContent === 'Time Series') {
            this.setState({technical_indicator: 'daily_adjusted'});
        }
        else this.setState({technical_indicator: e.currentTarget.textContent});
        this.setState({is_updated: !this.state.is_updated})
    }


    render() { 
        return (
            <div className="Content">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img className="App-logo" src={logo} alt="logo" />
                </a>

                {this.state.stock_list[0]}

                <div className="p-2">
                    <GenerateGraphs key={this.state.is_updated} ticker={this.state.stock_ticker} data_type_name={this.state.technical_indicator}/>
                </div>
                    <div class="d-flex justify-content-between p-3">
                        <div class="row ">
                            <div class="col">
                            <DropdownButton id="dropdown-basic-button" variant="secondary" title="Stock Ticker">
                                {this.state.stock_list.map(item=> (
                                    <Dropdown.Item onClick={this.setStockTicker}>{item}</Dropdown.Item>
                                ))}
{/*                                 <Dropdown.Item onClick={this.setStockTicker}>TSLA</Dropdown.Item>
                                <Dropdown.Item onClick={this.setStockTicker}>AAPL</Dropdown.Item>
                                <Dropdown.Item onClick={this.setStockTicker}>WKHS</Dropdown.Item>
                                <Dropdown.Item onClick={this.setStockTicker}>ABR</Dropdown.Item>
                                <Dropdown.Item onClick={this.setStockTicker}>GOOGL</Dropdown.Item> */}
                            </DropdownButton>
                            </div>
                                
                            <div class="col">
                            <DropdownButton id="dropdown-basic-button" variant="secondary" title="Technical Indicator">
                                <Dropdown.Item onClick={this.setTechnicalIndicator}>RSI</Dropdown.Item>
                                <Dropdown.Item onClick={this.setTechnicalIndicator}>SMA</Dropdown.Item>
                                <Dropdown.Item onClick={this.setTechnicalIndicator}>VWAP</Dropdown.Item>
                                <Dropdown.Item onClick={this.setTechnicalIndicator}>Time Series</Dropdown.Item>
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