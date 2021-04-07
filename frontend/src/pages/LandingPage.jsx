import React from 'react'
import landingPage from '../images/landingPage.png';


function LandingPage() {
    return (
        <div className="Landing-page Content">
            {/* <h1>LandingPage</h1> */}
            <img src={landingPage}  alt="logo" />
            <p  style={{'font-family': '"Lucida Console", "Courier New", monospace'}}>
                <br/><br/>
                Intuitive stock visualization of market trends <br/>
                Accessible educational resources <br/>
                Customized for your investment goals <br/>
            </p>

            <div className="text-end"style={{'justify-content': 'flex-end'}} className={"button"}>
                <button type="button" className="btn btn-outline-light me-2"><a href="/login" className="text-white">Login</a></button>
                <button type="button" className="btn btn-warning" style={{'margin':'20px'}}><a href="/sign-up" className="text-white">Sign Up</a></button>
            </div>
        
        </div>
    );
}

export default LandingPage;