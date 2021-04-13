import React, { Component } from 'react';
import logo from '../images/greyLogoCropped.png';
import GeneralEducation from '../components/educationalMaterial/GeneralEducation';
import LowRiskMaterial from '../components/educationalMaterial/LowRiskMaterial';
import HighRiskMaterial from '../components/educationalMaterial/HighRiskMaterial';



//I cannot comment the code inside of the education function. Strange?
//List of Blocks in the Education Page with photos, desciptions and hyperlinks about stocks and investing
class Education extends Component {
    constructor(props) {
        super(props);
        
        let UserData = localStorage.getItem("UserData")
    
        UserData = JSON.parse(UserData)
    
        console.log(UserData)
    
        this.state = {
          investmentType: UserData.investmentType,
        }

      }
    render() {
        return (
            <div>
                <div className="Header">
                    <img className="App-logo" src={logo} alt="Card" />
                    {/* {this.state.investmentType} */}
                </div>

                 {(this.state.investmentType) === 0 ? <LowRiskMaterial/> : <HighRiskMaterial />} 

                <GeneralEducation />
            </div>
        );
    }
}

export default Education;