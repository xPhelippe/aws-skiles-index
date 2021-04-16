import React, { Component } from 'react';
import logo from '../images/greyLogoCropped.png';
import GeneralEducation from '../components/educationalMaterial/GeneralEducation';
import LowRiskMaterial from '../components/educationalMaterial/LowRiskMaterial';
import HighRiskMaterial from '../components/educationalMaterial/HighRiskMaterial';



class Education extends Component {
    constructor(props) {
        super(props);
        
        let UserData = localStorage.getItem("UserData")
    
        UserData = JSON.parse(UserData)

        console.log(UserData)
    
        this.state = {
            
            investmentType: UserData.investmentType
/*           investmentType: UserData.investmentType,
 */    }

    }





    render() {
        return (
            <div>
                <div className="Header">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img className="App-logo" src={logo} alt="logo" />
                    </a>
                    {/* {this.state.investmentType} */}
                </div>

                 {(this.state.investmentType) === 0 ? <LowRiskMaterial/> : <HighRiskMaterial />} 
                <GeneralEducation />
            </div>
        );
    }
}

export default Education;