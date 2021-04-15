import Chart from '../components/TimeSeries';
import SMA from '../components/SMA';
import VWAP from '../components/VWAP';
import RSI from '../components/RSI';
import logo from '../images/greyLogoCropped.png';


const Graphs = () => {
    return (
        <div className="Content">
            <img className="App-logo" src={logo} alt="Card" />
            <div >
                
                <div className="mt-3 p-3 border border-light rounded" style={{'width':'650px'}}>
                    <h4>Sample Technical Indicator Graphs for TSLA</h4>
                </div>
                    
                <div>_________________________________________________________________________________________________</div>
                
                <Chart />
                100 Days of TSLA Time Series Data
                 <SMA />
                Simple Moving Average (SMA) for TSLA
                <VWAP />
                Volume Weighted Average Price (VWAP) for TSLA
                <RSI />
                Relative Strength Index (RSI) for TSLA
            </div>
        </div>
    );
}
 
export default Graphs;