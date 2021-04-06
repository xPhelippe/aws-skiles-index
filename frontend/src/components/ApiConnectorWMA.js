import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://www.alphavantage.co/query'
});

export const getWMAForSymbol = (symbol) => {
    return axiosInstance.get('', {
        params: {
            function: 'wma', 
            symbol,
            apikey: 'XDA8VT0V9BKZ6C1A',
            interval: 'weekly',
            time_period: 60,
            series_type: 'open'
        }
    })
}
