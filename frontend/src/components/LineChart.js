import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';


const LineChart = (props) => {
    const stockData = props.stockData;

    return (
        <div>
            <CanvasJSChart
                options={{
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
                }} 
            />
        </div>
    );
};

export default LineChart;