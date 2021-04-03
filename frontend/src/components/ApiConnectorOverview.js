import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://www.alphavantage.co/query'
});

export const getOverviewForSymbol = (symbol) => {
    return axiosInstance.get('', {
        params: {
            function: 'Overview', 
            symbol,
            apikey: 'XDA8VT0V9BKZ6C1A'
        }
    })
}