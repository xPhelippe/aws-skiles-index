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
            <img class="App-logo" src={logo} alt="Card" />

            <div class="row mb-1 mt-4 justify-content-center">
              <div class="col mx-0">
                <div class="card" >
                  <img class="card-img-top" style={{'width':'100%'}} src={stockGraph} alt="Card" />
                  <div class="card-body d-flex flex-column" >
                    <h4 class="card-title">Technical Indicators</h4>
                    <p class="card-text">Graphical stock visualization</p>
                    <a href="/graphs" class="mt-auto btn btn-warning stretched-link">See Example</a>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card" >
                  <img class="card-img-top" style={{'width':'100%'}} src={watch} alt="Card" />
                  <div class="card-body d-flex flex-column" >
                    <h4 class="card-title">Watchlist</h4>
                    <p class="card-text">Quick reference for stock data</p>
                    <a href="/watchlist" class="mt-auto btn btn-warning stretched-link">See Example</a>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card" >
                  <img class="card-img-top" style={{'width':'100%'}} src={book} alt="Card" />
                  <div class="card-body d-flex flex-column" >
                    <h4 class="card-title">Education</h4>
                    <p class="card-text">Learn more about the stock market</p>
                    <a href="/education" class="mt-auto btn btn-warning stretched-link">See Example</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        );
    }
}
 
export default Features;
