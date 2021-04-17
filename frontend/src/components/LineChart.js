import logo from '../images/greyLogoCropped.png';
import axios from "axios";
import getAPIHost from './Environment'
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router"

import React, { Component, useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getRSIForSymbol } from './ApiConnectorRSI';



const LineChart = (props) => {
    //console.log(props.stockData);
    const stockData = props.stockData;

    return (
        <div>
        <CanvasJSChart
            
        options={ {
            
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                },
            },

            data: [
                {
                    type: "line",
                    markerSize: 8,
                    dataPoints: stockData.map(stockData => ({
                        x: new Date(stockData.date),
                        y: stockData.indicator_value
                        
                    }))
                }
            ]
        } 
    }
    />
    </div>
    );
};


export default LineChart;