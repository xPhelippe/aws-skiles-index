import React, { Component } from 'react';
import treasurySecurities from './images/treasurySecuritiesImg.jpg'
import municipalBond from './images/municipalBond.jpg'
import certificateOfDeposit from './images/certificateOfDeposit.png'

/**
 * LowRiskMaterial.js
 * Purpose: Create list of blocks for the low risk user's education page with photos, desciptions and hyperlinks about stocks and investing
 * @author Joseph Patullo
 */

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
                                <a href="https://www.investopedia.com/articles/investing/073113/introduction-treasury-securities.asp" target="_blank" rel="noreferrer" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>

                    <div className="col mx-0 mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={municipalBond} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Municipal Bond</h4>
                                <p className="card-text"></p>
                                <a href="https://www.investopedia.com/terms/m/municipalbond.asp" target="_blank" rel="noreferrer" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>

                    <div className="col mx-0 mb-4">
                        <div className="card" >
                        <img className="card-img-top" style={{'width':'100%'}} src={certificateOfDeposit} alt="Card" />
                            <div className="card-body d-flex flex-column" >
                                <h4 className="card-title">Certificate Of Deposit(CDs)</h4>
                                <p className="card-text"></p>
                                <a href="https://www.investopedia.com/terms/c/certificateofdeposit.asp" target="_blank" rel="noreferrer" className="mt-auto btn btn-warning stretched-link">See Example</a>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        );
    }
}

export default LowRiskMaterial;