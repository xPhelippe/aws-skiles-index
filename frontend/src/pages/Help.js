import React from 'react';
import GenerateGraphs from '../components/GenerateGraphs';
import logo from '../images/greyLogoCropped.png';
import GraphTestConnection from '../components/GraphTestConnection';

function Help() {
    return (
        <div className="Content">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="h2">Help</h2>

            <GraphTestConnection ticker={"TSLA"} />
            <GenerateGraphs name="Sara" ticker="WKHS" data_type_name="RSI"/>
        </div>
    );
}

export default Help;