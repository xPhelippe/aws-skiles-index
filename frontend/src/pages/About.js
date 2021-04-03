import React from 'react';
import logo from '../images/greyLogoCropped.png';


function About() {
    return (
        <div className="Content">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 class="h2">About the Skiles Index...</h2>
            <p style={{'width': '800px', 'margin-top':'25px', 'animation': 'fadein 7s ease-out'}}>
            The Skiles Index is a web application that provides information on popular stocks and strategy advice for beginning investors. This application will offer users clear and intuitive visualization of market trends and provide recommendations based on the user’s specified investment goals and experience level.
            <br/><br/>Beyond offering relevant market data, the application serves as a platform that provides investing educational material by presenting relevant links, videos, and reference material for the basics of financial literacy and investment strategies. The Skiles Index provides a centralized site for users to learn the basics of interpreting market trends and understand the basics of investing.

            </p>
        </div>
    );
}

export default About;