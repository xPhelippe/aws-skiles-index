import React, { Component } from 'react';
import logo from '../images/greyLogoCropped.png';
import GeneralEducation from '../components/educationalMaterial/GeneralEducation';
import LowRiskMaterial from '../components/educationalMaterial/LowRiskMaterial';
import HighRiskMaterial from '../components/educationalMaterial/HighRiskMaterial';

/**
 * Education.js
 * Purpose: Display education content from GeneralEducation.js, and either HighRiskMaterial.js or LowRiskMaterial.js (depending on user's investment type)
 * @author Elisa Rexinger
*/

class Education extends Component {
    constructor(props) {
        super(props);

        this.state = {
            investmentType: ''
        }
    }

    // get user's invesment type
    setInvestmentType = () => {
        let UserData = localStorage.getItem("UserData")
        UserData = JSON.parse(UserData)
        if(UserData != null) {
            this.setState({investmentType: UserData.investmentType})
            console.log(UserData)
        }
    }

    /**
     * Determine the customized display of the educational material page
     * @returns User the educational component corresponding to the user's risk type
    */
    getMaterial = () => {
        if(this.state.investmentType === '') {
            this.setInvestmentType();
        } 
        /* Need to specify both integer and string types of investmentType since the UserData object changes the type to string after the user edits their investment type - Need to fix */
        switch(this.state.investmentType) {
            case 0: return <LowRiskMaterial /> 
            case '0': return <LowRiskMaterial /> 
            case 1: return <HighRiskMaterial /> 
            case '1': return <HighRiskMaterial /> 
            default: return;
        }
    }

    // set the investment type state variable on component mount
    componentDidMount() {
        this.setState({investmentType: ''})
    }


    render() {
        return (
            <div>
                <div className="Header">
                    <a href="/">
                        <img className="App-logo" src={logo} alt="logo" />
                    </a>
                </div>

                {this.getMaterial()}
                <GeneralEducation />
            </div>
        );
    }
}

export default Education;