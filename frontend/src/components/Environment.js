const getAPIHost = () => {

  if (process.env.REACT_APP_API_HOST !== undefined)
    return process.env.REACT_APP_API_HOST;
  else
    return 'http://127.0.0.1:8000';
}

export default getAPIHost;
