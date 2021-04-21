import React, { Component } from 'react';
import cryptoCurrency from './images/cryptoCurrencyImg.jpg'
import optionsContracts from './images/optionsContractsImg.jpg'
import futuresTrading from './images/futuresTradingImg.jpg'

/**
 * HighRiskMaterial.js
 * Purpose: Create list of blocks for the high risk user's education page with photos, desciptions and hyperlinks about stocks and investing
 * @author Joseph Patullo
 */


class HighRiskMaterial extends Component {
    render() {
        return (
            <div className="container">
                <div className="mt-3 p-3 border border-light rounded" style={{'width':'340px'}}>
                        <h4>Risk Tolerant Content</h4>
                </div>
                <div className="row mb-1 mt-4 justify-content-center">

                     <div className="col mx-0  mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={cryptoCurrency} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Crypto Currency</h4>
                                <p className="card-text"></p>
                                <a href="https://www.investopedia.com/terms/c/cryptocurrency.asp" rel="noreferrer" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>
    
                    <div className="col mx-0 mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={optionsContracts} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Options</h4>
                                <p className="card-text"></p>
                                <a href="https://www.investopedia.com/terms/o/optionscontract.asp" rel="noreferrer" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>

                    <div className="col mx-0 mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={futuresTrading} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Futures</h4>
                                <p className="card-text"></p>
                                <a href="https://www.schwab.com/futures/what-are-futures" rel="noreferrer" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default HighRiskMaterial;