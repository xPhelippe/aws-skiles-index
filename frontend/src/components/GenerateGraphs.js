import logo from '../images/greyLogoCropped.png';
import axios from "axios";
import getAPIHost from './Environment'

import React, { Component, useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getRSIForSymbol } from './ApiConnectorRSI';
import { getGraphTest } from './GraphTestConnection';
import LineChart from './LineChart';
import CandleStickChart from './CandleStickChart';



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
              getAPIHost() + '/stocks/' + props.data_type_name + '/' + props.ticker + '?start_time=2021-01-1&end_time=2021-04-12'   
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
        <div className="container" style={{'width':'950px'}}>
            {(props.data_type_name) === 'daily_adjusted' ? 'Time Series (Daily Adjusted)' : props.data_type_name} for {props.ticker} 
            {(props.data_type_name) === 'daily_adjusted' ? <CandleStickChart stockData={stockData}/> : <LineChart stockData={stockData}/>} 

            {/* <LineChart stockData={stockData}/> */}
{/*             <CanvasJSChart
            
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
            /> */}
        </div>
    );
};

function formatStockData(stockData, dataType) {
    // Convert stockData from an object to an array
    if (dataType === 'daily_adjusted') {
        return Object.entries(stockData).map(entries => {
            const [time, priceData] = entries;
            console.log(dataType);
            return {
                date: priceData.timestamp,
                open: Number(priceData['open']),
                high: Number(priceData['high']),
                low: Number(priceData['low']),
                close: Number(priceData['close'])
            }
        });
    }
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