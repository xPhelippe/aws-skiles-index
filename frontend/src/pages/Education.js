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

    setInvestmentType = () => {
        let UserData = localStorage.getItem("UserData")
        UserData = JSON.parse(UserData)
        if(UserData != null) {
            this.setState({investmentType: UserData.investmentType})
            console.log(UserData)
        }
    }

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

    componentDidMount() {
        this.setState({investmentType: ''})
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