import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://www.alphavantage.co/query'
});

export const getRSIForSymbol = (symbol) => {
    return axiosInstance.get('', {
        params: {
            function: 'rsi', 
            symbol,
            apikey: 'XDA8VT0V9BKZ6C1A',
            interval: 'weekly',
            time_period: 20,
            series_type: 'open'
        }
    })
}
