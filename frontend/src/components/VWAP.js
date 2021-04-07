import React, { useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getVWAPForSymbol } from './ApiConnectorVWAP';

const VWAP = () => {
    const [stockData, setStockData] = useState([]);

    // Fetch daily stock chart for TSLA when the component mounts
    useEffect(() => {
        const fetchStockData = async () => {
            const result = await getVWAPForSymbol('TSLA');
            console.log(result.data);
            setStockData(formatStockData(result.data['Technical Analysis: VWAP']));
            console.log(stockData)
        };

        fetchStockData();
    }, []);

    return (
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
                        markerSize: 12,
                        dataPoints: stockData.map(stockData => ({
                            x: new Date(stockData.date),
                            y: stockData.vwap
                            
                        }))
                    }
                ]
            } 
        }
        />
    );
};

function formatStockData(stockData) {
    // Convert stockData from an object to an array
    return Object.entries(stockData).map(entries => {
        const [date, priceData] = entries;

        return {
            date,
            vwap: Number(priceData['VWAP'])
        }
    });
}

export default VWAP;