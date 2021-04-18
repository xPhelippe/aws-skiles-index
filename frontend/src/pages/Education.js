import React, { Component } from 'react';
import logo from '../images/greyLogoCropped.png';
import GeneralEducation from '../components/educationalMaterial/GeneralEducation';
import LowRiskMaterial from '../components/educationalMaterial/LowRiskMaterial';
import HighRiskMaterial from '../components/educationalMaterial/HighRiskMaterial';


class Education extends Component {
    constructor(props) {
        super(props);

        this.state = {
            investmentType: ''
        }
    }

    setInvestmentType() {
        let UserData = localStorage.getItem("UserData")
        UserData = JSON.parse(UserData)
        if(UserData != null) {
            this.setState({investmentType: UserData.investmentType})
        } else {
        }

    }

    getMaterial = () => {
        if(this.state.investmentType === '') {
            this.setInvestmentType();
        } 
        switch(this.state.investmentType) {
            case '0': return <LowRiskMaterial />
            case '1': return <HighRiskMaterial />
            default: return;
        }
/*         return this.state.investmentType
 */
    }


    render() {
        return (
            <div>
                <div className="Header">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img className="App-logo" src={logo} alt="logo" />
                    </a>
                </div>

                {this.getMaterial()}
{/*                 <LowRiskMaterial/>
 */}{/*                 {(this.state.investmentType) === 0 && <LowRiskMaterial/>} 
 */}                <GeneralEducation />
            </div>
        );
    }
}

export default Education;