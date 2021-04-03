// eslint-disable-next-line
import React, { Component, useEffect, useState } from 'react';
//import { getDailyChartForSymbol} from '../components/ApiConnector';
import Chart from '../components/Chart';

const Graphs = () => {
    return (
        <div class="Content">
            <div >
                <div>_________________________________________________________________________________________________</div>
                <Chart />
                <div > 100 Days of TSLA Time Series Data</div>
                <div className="form-group">
                    <button type="button" class="btn btn-outline-light me-2"><a href="/features" class="text-white">Back</a></button>                
                </div>
            </div>
        </div>
    );
}
 
export default Graphs;