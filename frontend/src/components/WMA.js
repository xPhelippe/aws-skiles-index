import React, { useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getWMAForSymbol } from './ApiConnectorWMA';

const WMA = () => {
    const [stockData, setStockData] = useState([]);

    // Fetch daily stock chart for TSLA when the component mounts
    useEffect(() => {
        const fetchStockData = async () => {
            const result = await getWMAForSymbol('TSLA');
            //console.log(result.data);
            setStockData(formatStockData(result.data['Technical Analysis: WMA']));
            //console.log(stockData)
            console.log('here');
        };

        fetchStockData();
    }, []);

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
                  /*       dataPoints: [
                            { x: new Date(2016, 2), y: 5.382 },
                            { x: new Date(2016, 5), y: 6.436 },
                            { x: new Date(2016, 8), y: 7.011 },
                            { x: new Date(2016, 11), y: 8.809 }
                        ] */
                        dataPoints: stockData.map(stockData => ({
                            x: new Date(stockData.date),
                            y: stockData.wma
                            
                        }))
                    }
                ]
            } 
        }
        />
        </div>
    );
};

function formatStockData(stockData) {
    // Convert stockData from an object to an array
    return Object.entries(stockData).map(entries => {
        const [date, priceData] = entries;

        return {
            date,
            wma: Number(priceData['WMA'])
        }
    });
}

export default WMA;
