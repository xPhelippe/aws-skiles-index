import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

/**
 * CandleStickChart.js
 * Purpose: Format a candlestick chart for the Time Series graphing option
 *          Used on /graphs accessed on the Features page (/features) or on the home page (/home)
 *          Called by GenerateGraphs.js if the props.data_type_name is "daily_adjusted"
 * @author Elisa Rexinger
 */


const CandleStickChart = (props) => {
    /* stockData is the data from the api call: 
       getAPIHost() + '/stocks/' + props.data_type_name + '/' + props.ticker + '?start_time=2021-01-1&end_time=2021-04-12' */
    const stockData = props.stockData;  

    return (
        <div>
            {/* https://canvasjs.com/ for chart documentation*/}
            <CanvasJSChart
                options={ {
                    axisY: {
                        // let users see closest data point on hover
                        crosshair: {
                            enabled: true,
                            snapToDataPoint: true
                        }
                    },
                    axisX: {
                        // let users see closest data point on hover
                        crosshair: {
                            enabled: true,
                            snapToDataPoint: true
                        },
                        // we don't want open space between candlesticks
                        scaleBreaks: {
                            spacing: 0,
                            fillOpacity: 0,
                            lineThickness: 0,
                            customBreaks: stockData.reduce((breaks, value, index, array) => {
                                // there is no previous data point
                                if (index === 0) return breaks;

                                // Time for current and previous data points
                                const currentDataPointUnix = Number(new Date(value.date));
                                const previousDataPointUnix = Number(new Date(array[index - 1].date));

                                // Convert to milliseconds
                                const oneDayInMs = 86400000;
                                const difference = previousDataPointUnix - currentDataPointUnix;
                                
                                // returning the scaled break
                                return difference === oneDayInMs ? breaks : [...breaks,
                                        {
                                            startValue: currentDataPointUnix,
                                            endValue: previousDataPointUnix - oneDayInMs
                                        }
                                    ]
                            }, [])
                        }
                    },

                    // candlestick chart data represents the open, high, low, and close market prices - in that specific order
                    data: [
                        {
                            type: 'candlestick',
                            dataPoints: stockData.map(stockData => ({
                                x: new Date(stockData.date),
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