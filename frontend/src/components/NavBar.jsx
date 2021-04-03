import React from 'react';
import miniAang from '../images/miniAang.png';


function NavBar() {
    return (
      <header class="p-3 style={{'background-color': '#1c1c1c', 'margin':'10}} text-white" className={"button"}>
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-flex-start justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src={miniAang} className="Mini-aang" alt="mini-aang" />
          </a>
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/features" class="nav-link px-2 text-white">Features</a></li>
            <li><a href="/about" class="nav-link px-2 text-white">About Us</a></li>
            <li><a href="/help" class="nav-link px-2 text-white">Help</a></li>
          </ul>

          <div class="text-end"style={{'justify-content': 'flex-end'}} className={"button"}>
            <button type="button" class="btn btn-outline-light me-2"><a href="/login" class="text-white">Login</a></button>
            <button type="button" class="btn btn-warning" style={{'margin':'20px'}}><a href="/sign-up" class="text-white">Sign Up</a></button>
          </div>
        </div>
      </div>
    </header>
  );    
}

export default NavBar;