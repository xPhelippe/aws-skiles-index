import logo from '../images/greyLogoCropped.png';
import axios from "axios";
import getAPIHost from './Environment'
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router"

import React, { Component, useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getRSIForSymbol } from './ApiConnectorRSI';
import { getGraphTest } from './GraphTestConnection';



const GenerateGraphs = (props) => {
    const [stockData, setStockData] = useState([]);
    const[ticker, setTicker] = useState([]);
    // Fetch daily stock chart for TSLA when the component mounts
    useEffect(() => {
        const fetchStockData = async () => {
            setTicker(props.ticker);
            /* const result = getGraphTest(); */
            axios
            .get(
              getAPIHost() + '/stocks/' + props.data_type_name + '/' + props.ticker + '?start_time=2021-01-30&end_time=2021-03-31'   
            )
            .then(response => {
            
            //this.props.handleSuccessfulAuth(response.data);
              
              //console.log('in axios call - graph test');
              //console.log(response.data.RSI);   
              //console.log(response.data.RSI[4]);
              setStockData(formatStockData(response.data[props.data_type_name], props.data_type_name));   
              
            })
            .catch(error => {
              console.log("stock api call error", error);
            });


            //console.log(result);

            //console.log(result.data);
            //setStockData(formatStockData(result['SMA']));
            //console.log(stockData)



        };

        
            
        

        fetchStockData();
    }, []);



    return (
        <div className="container" style={{'width':'850px'}}>
            {props.ticker} 
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

function formatStockData(stockData, dataType) {
    // Convert stockData from an object to an array
    return Object.entries(stockData).map(entries => {
        const [time, priceData] = entries;
        console.log(dataType);
        return {
            date: priceData.timestamp,
            indicator_value: Number(priceData[dataType])
        }
    });
}

export default GenerateGraphs;