import React, { Component } from 'react';
import logo from '../images/greyLogoCropped.png';
import book from '../images/book.png'
import watch from '../images/watch.png'
import stockGraph from '../images/stockGraph.png'
//import axios from "axios"


class Features extends Component {
    state = {  }
    render() { 
        return (
          <div className="container Content">
            <img className="App-logo" src={logo} alt="logo" />

            <div className="row mb-1 mt-4 justify-content-center">
              <div className="col mx-0">
                <div className="card" >
                  <img className="card-img-top" style={{'width':'100%'}} src={stockGraph} alt="Card" />
                  <div className="card-body d-flex flex-column" >
                    <h4 className="card-title">Technical Indicators</h4>
                    <p className="card-text">Graphical stock visualization</p>
                    <a href="/graphs" className="mt-auto btn btn-warning stretched-link">View Graphs</a>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card" >
                  <img className="card-img-top" style={{'width':'100%'}} src={watch} alt="Card" />
                  <div className="card-body d-flex flex-column" >
                    <h4 className="card-title">Watchlist</h4>
                    <p clasclassNames="card-text">Quick reference for stock data</p>
                    <a href="/watchlist" className="mt-auto btn btn-warning stretched-link">See Example</a>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card" >
                  <img className="card-img-top" style={{'width':'100%'}} src={book} alt="Card" />
                  <div className="card-body d-flex flex-column" >
                    <h4 className="card-title">Education</h4>
                    <p className="card-text">Learn more about the stock market</p>
                    <a href="/education" className="mt-auto btn btn-warning stretched-link">Learn More</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        );
    }
}
 
export default Features;
