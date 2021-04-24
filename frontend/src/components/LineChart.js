import React from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';


/**
 * LineChart.js
 * Purpose: Format a line chart for the SMA, RSI, or VWAP graphing option
 *          Used on /graphs accessed on the Features page (/features) or on the
 *          home page (/home)
 *          Called by GenerateGraphs.js if the props.data_type_name is "SMA",
 *          "RSI", or "VWAP"
 * @author Elisa Rexinger
 */

const LineChart = (props) => {
  /* stockData is the data from the api call:
       getAPIHost() + '/stocks/' + props.data_type_name + '/' + props.ticker +
    '?start_time=2021-01-1&end_time=2021-04-12' */
  const stockData = props.stockData;

  return (
    <div>
      {/* https://canvasjs.com/ for chart documentation*/}
      <CanvasJSChart
        options={{
          axisX: {
            // let users see closest data point on hover
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
            },
          },

          data: [
            {
              type: 'line',
              markerSize: 8,
              dataPoints: stockData.map((stockData) => ({
                x: new Date(stockData.date),
                y: stockData.indicator_value,

              })),
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;

