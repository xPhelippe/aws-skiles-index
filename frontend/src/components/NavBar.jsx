import React from 'react';
import miniAang from '../images/miniAang.png';


function NavBar() {
    return (
      <header className="p-3 style={{'background-color': '#1c1c1c', 'margin':'10}} text-white" className={"button"}>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-flex-start justify-content-lg-start">
          <a href="/home" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src={miniAang} className="Mini-aang" alt="mini-aang" />
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/features" className="nav-link px-2 text-light">Features</a></li>
            <li><a href="/about" className="nav-link px-2 text-light">About Us</a></li>
            <li><a href="/help" className="nav-link px-2 text-light">Help</a></li>
          </ul>

          <div className="text-end"style={{'justify-content': 'flex-end'}} className={"button"}>
            <a href="/login" className="btn btn-outline-light me-2" style={{'margin':'12px'}}>Login</a>
            <a href="/sign-up" className="btn btn-warning text-white" style={{'margin':'12px'}}>Sign Up</a>
          </div>
        </div>
      </div>
    </header>
  );    
}

export default NavBar;