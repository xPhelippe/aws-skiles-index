import React from 'react'
import landingPage from '../images/landingPage.png';


/**
 * LandingPage.js
 * Purpose: Landing page
 * @author Elisa Rexinger
*/

function LandingPage() {
    return (
        <div className="Landing-page Content">
            <img src={landingPage}  alt="logo" className="Landing-page"/>
            <p>
                <br/><br/>
                Intuitive stock visualization of market trends <br/>
                Accessible educational resources <br/>
                Customized for your investment goals <br/>
            </p>

            <div className="text-end"style={{'justify-content': 'flex-end'}} className={"button"}>                
                <a href="/login" className="btn btn-outline-light me-2" style={{'margin':'20px'}}>Login</a>
                <a href="/sign-up" className="btn btn-warning text-white" style={{'margin':'20px'}}>Sign Up</a>
            </div>
        
        </div>
    );
}

export default LandingPage;