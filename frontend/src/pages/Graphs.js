import Chart from '../components/Chart';
import SMA from '../components/SMA';
import VWAP from '../components/VWAP';
import RSI from '../components/RSI';

const Graphs = () => {
    return (
        <div className="Content">
            <div >
                <div>_________________________________________________________________________________________________</div>
                <Chart />
                <div > 100 Days of TSLA Time Series Data</div>
                <div className="form-group">
                    <button type="button" className="btn btn-outline-light me-2"><a href="/features" class="text-white">Back</a></button>                
                </div>
                 <SMA />
                sma
                <VWAP />
                vwap
                <RSI />
                rsi
            </div>
        </div>
    );
}
 
export default Graphs;