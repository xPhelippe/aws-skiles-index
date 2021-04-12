import React from 'react';
import logo from '../images/greyLogoCropped.png';
import fundamentalAnalysis from '../components/educationalMaterial/images/fundamentalAnalysisImg.jpg'
import investorVsTrader from '../components/educationalMaterial/images/investorVsTraderImg.jpg'
import mutualFundsVsETFs from '../components/educationalMaterial/images/mutualFundsVsETFsImg.jpg'
import riskTolerance from '../components/educationalMaterial/images/riskToleranceImg.png'
import stockMarketSectors from '../components/educationalMaterial/images/stockMarketSectorsImg.jpg'
import stocksIntroduction from '../components/educationalMaterial/images/stocksIntroductionImg.jpg'
import taxes from '../components/educationalMaterial/images/taxesImg.jpeg'
import technicalAnalysis from '../components/educationalMaterial/images/technicalAnalysisImg.png'
import tradingStocks from '../components/educationalMaterial/images/tradingStocksImg.png'


//I cannot comment the code inside of the education function. Strange?
//List of Blocks in the Education Page with photos, desciptions and hyperlinks about stocks and investing
function Education() {
    return (
        <div className="container Content">
            <img className="App-logo" src={logo} alt="Card" />
            <h1>Education</h1>
            <div className="row mb-1 mt-4 justify-content-center">

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%', 'textAlign':'center'}} src={stocksIntroduction} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Stocks Introduction</h4>
                            <p className="card-text font-size: 14 px"></p>
                            <a href="https://stockstotrade.com/40-trading-terms-beginners-infographic/" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={tradingStocks} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Trading Stocks</h4>
                            <p className="card-text font-size: 14 px"></p>
                            <a href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclaytrader.com%2Fwp-content%2Fuploads%2F2016%2F06%2FTrading101_HowToBuyStocks.jpg&f=1&nofb=1" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={stockMarketSectors} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Stock Market Sectors</h4>
                            <p className="card-text font-size: 14 px"></p>
                            <a href="https://www.fool.com/investing/stock-market/market-sectors/" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={mutualFundsVsETFs} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Mutual Funds</h4>
                            <p className="card-text"></p>
                            <a href="https://www.investopedia.com/articles/exchangetradedfunds/08/etf-mutual-fund-difference.asp" target="_blank" className="mt-auto btn btn-warning">Mutual Funds Vs ETFs</a>
                            <a href="https://www.daveramsey.com/blog/types-of-mutual-funds" target="_blank" className="mt-auto btn btn-warning"> Mutual Funds</a>
                            <a href="https://www.investopedia.com/terms/e/etf.asp" target="_blank" className="mt-auto btn btn-warning"> ETFs</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={investorVsTrader} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Investing vs Trading</h4>
                            <p className="card-text"></p>
                            <a href="https://www.investopedia.com/ask/answers/12/difference-investing-trading.asp" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={fundamentalAnalysis} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Fundamental Analysis</h4>
                            <p className="card-text"></p>
                            <a href="https://www.investopedia.com/articles/fundamental/03/022603.asp" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={technicalAnalysis} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Technical Analysis</h4>
                            <p className="card-text"></p>
                            <a href="https://www.investopedia.com/top-7-technical-analysis-tools-4773275" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={riskTolerance} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Risk Tolerance</h4>
                            <p className="card-text font-size: 14 px"></p>
                            <a href="https://www.investopedia.com/terms/r/risktolerance.asp" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>

                <div className="col mx-0 mb-4">
                    <div className="card" >
                    <img className="card-img-top" style={{'width':'100%'}} src={taxes} alt="Card" />
                        <div className="card-body d-flex flex-column" >
                            <h4 className="card-title">Taxes</h4>
                            <p className="card-text font-size: 14 px"></p>
                            <a href="https://www.investopedia.com/articles/personal-finance/101515/comparing-longterm-vs-shortterm-capital-gain-tax-rates.asp" target="_blank" className="mt-auto btn btn-warning stretched-link">See Example</a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    );
}

export default Education;