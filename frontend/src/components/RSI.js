import React, { useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getRSIForSymbol } from './ApiConnectorRSI';

const RSI = () => {
    const [stockData, setStockData] = useState([]);
    // Fetch daily stock chart for TSLA when the component mounts
    useEffect(() => {
        const fetchStockData = async () => {
            const result = await getRSIForSymbol('TSLA');
            console.log(result.data);
            setStockData(formatStockData(result.data['Technical Analysis: RSI']));
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
                        markerSize: 8,
                        dataPoints: stockData.map(stockData => ({
                            x: new Date(stockData.date),
                            y: stockData.rsi
                            
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

        console.log(date)

        return {
            date,
            rsi: Number(priceData['RSI'])
        }
    });
}

export default RSI;
