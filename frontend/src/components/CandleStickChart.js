import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';


const CandleStickChart = (props) => {
    const stockData = props.stockData;

    return (
        <div>
            <CanvasJSChart
                options={ {
                    axisY: {
                        // Minimum value is 10% less than the lowest price in the dataset
                        minimum: Math.min(...stockData.map(data => data.low)) / 1.1,
                        // Minimum value is 10% more than the highest price in the dataset
                        maximum: Math.max(...stockData.map(data => data.high)) * 1.1,
                        crosshair: {
                            enabled: true,
                            snapToDataPoint: true
                        }
                    },
                    axisX: {
                        crosshair: {
                            enabled: true,
                            snapToDataPoint: true
                        },
                        scaleBreaks: {
                            spacing: 0,
                            fillOpacity: 0,
                            lineThickness: 0,
                            customBreaks: stockData.reduce((breaks, value, index, array) => {
                                // Just return on the first iteration
                                // Since there is no previous data point
                                if (index === 0) return breaks;

                                // Time in UNIX for current and previous data points
                                const currentDataPointUnix = Number(new Date(value.date));
                                const previousDataPointUnix = Number(new Date(array[index - 1].date));

                                // One day converted to milliseconds
                                const oneDayInMs = 86400000;

                                // Difference between the current and previous data points
                                // In milliseconds
                                const difference = previousDataPointUnix - currentDataPointUnix;

                                return difference === oneDayInMs
                                    // Difference is 1 day, no scale break is needed
                                    ? breaks
                                    // Difference is more than 1 day, need to create
                                    // A new scale break
                                    : [
                                        ...breaks,
                                        {
                                            startValue: currentDataPointUnix,
                                            endValue: previousDataPointUnix - oneDayInMs
                                        }
                                    ]
                            }, [])
                        }
                    },
                    data: [
                        {
                            type: 'candlestick',
                            dataPoints: stockData.map(stockData => ({
                                x: new Date(stockData.date),
                                // The OHLC for the data point
                                // The order is IMPORTANT!
                                y: [
                                    stockData.open,
                                    stockData.high,
                                    stockData.low,
                                    stockData.close
                                ]
                            }))
                        }
                    ]
                }}
            />

        </div>
    );
};


export default CandleStickChart;