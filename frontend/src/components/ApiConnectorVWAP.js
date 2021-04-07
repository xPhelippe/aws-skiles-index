import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://www.alphavantage.co/query'
});

export const getVWAPForSymbol = (symbol) => {
    return axiosInstance.get('', {
        params: {
            function: 'VWAP', 
            symbol,
            apikey: 'XDA8VT0V9BKZ6C1A',
            interval: '30min',
        }
    })

}
