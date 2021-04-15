import React, { Component } from 'react';
import logo from '../../images/greyLogoCropped.png';
import fundamentalAnalysis from './images/fundamentalAnalysisImg.jpg'
import investorVsTrader from './images/investorVsTraderImg.jpg'
import mutualFundsVsETFs from './images/mutualFundsVsETFsImg.jpg'
import riskTolerance from './images/riskToleranceImg.png'
import stockMarketSectors from './images/stockMarketSectorsImg.jpg'
import stocksIntroduction from './images/stocksIntroductionImg.jpg'
import taxes from './images/taxesImg.jpeg'
import technicalAnalysis from './images/technicalAnalysisImg.png'
import tradingStocks from './images/tradingStocksImg.png'
import cryptoCurrency from './images/cryptoCurrencyImg.jpg'
import optionsContracts from './images/optionsContractsImg.jpg'
import futuresTrading from './images/futuresTradingImg.jpg'
import treasurySecurities from './images/treasurySecuritiesImg.jpg'
import municipalBond from './images/municipalBond.jpg'
import certificateOfDeposit from './images/certificateOfDeposit.png'




//I cannot comment the code inside of the education function. Strange?
//List of Blocks in the Education Page with photos, desciptions and hyperlinks about stocks and investing
class LowRiskMaterial extends Component {
    render() {
        return (
            <div className="container">
                <div className="mt-3 p-3 border border-light rounded" style={{'width':'340px'}}>
                        <h4>Risk Averse Content</h4>
                </div>
                <div className="row mb-1 mt-4 justify-content-center">

                    {/* Low Risk */}
                     <div className="col mx-0 mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={treasurySecurities} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Treasury Securities</h4>
                                <p className="card-text"></p>
                                <a href="https://www.investopedia.com/articles/investing/073113/introduction-treasury-securities.asp" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>

                    <div className="col mx-0 mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={municipalBond} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Municipal Bond</h4>
                                <p className="card-text"></p>
                                <a href="https://www.investopedia.com/terms/m/municipalbond.asp" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>

                    <div className="col mx-0 mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={certificateOfDeposit} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Certificate Of Deposit(CDs)</h4>
                                <p className="card-text"></p>
                                <a href="https://www.investopedia.com/terms/c/certificateofdeposit.asp" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        );
    }
}

export default LowRiskMaterial;