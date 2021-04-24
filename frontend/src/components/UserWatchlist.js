import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import getAPIHost from './Environment';
import axios from 'axios';


/**
 * UserWatchlist.js
 * Purpose: Create watchlist component to show popular stock market ratios for
 * all of a user's selected stock list
 * @author Phelippe Souza-Herod
 * @author Elisa Rexinger
 */


class UserWatchlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      stock_list: [],
    };
  }

  // On component mount, call fetchStockRatio for each stock in the state array
  // stockName
  componentDidMount() {
    this.props.stockName.map((item) => (
      this.fetchStockRatio(item.stock.ticker)
    ));
    this.fetchStockTicker();
  }

    // Use /get_all_tickers endpoint to update the available stocks offered in
    // the "add/remove from watchlist menu" to reflect the stocks in the
    // database
    fetchStockTicker = async () => {
      axios
          .get(
              getAPIHost() + '/get_all_tickers',
          )
          .then((response) => {
            this.setState({stock_list: response.data.tickers});
          })
          .catch((error) => {
            console.log('stock api call error', error);
          });
    };


    /**
     * Add a stock to a user's favorite stock array using the /add_to_watchlist
     * endpoint
     * @param e event from selecting an item in the "add to watchlist" drop down
     * menu
     */
    addtoWatchlist = (e) => {
      const ticker = e.currentTarget.textContent;
      const user = this.props.user;

      const data = new FormData();
      data.append('username', user);
      data.append('ticker', ticker);

      axios
          .post(getAPIHost() + '/add_to_watchlist/', data)
          .then((response) => {
            console.log('made successful request');

            console.log(response.data);
            localStorage.setItem('UserData',
                JSON.stringify(response.data['userData']));
            // add to the current

            window.location.reload();
          }).catch((error) => {
            console.log('login error', error);
          });
    }

    /**
     * Remove a stock from a user's favorite stock array using the
     * /remove_from_watchlist endpoint
     * @param e event from selecting an item in the "remove from watchlist"
     * drop down menu
     */
    removeFromWatchlist = (e) => {
      const ticker = e.currentTarget.textContent;
      const user = this.props.user;

      const data = new FormData();
      data.append('username', user);
      data.append('ticker', ticker);

      axios
          .post(getAPIHost() + '/remove_from_watchlist/', data)
          .then((response) => {
            // add to the current watchlist
            console.log(response.data);
            localStorage.setItem('UserData',
                JSON.stringify(response.data['userData']));

            window.location.reload();
          }).catch((error) => {
            console.log('login error', error);
          });
    }

    /**
     * Receive a stocks overview data using the /get_stock_overview endpoint
     * @param ticker Name of stock ticker to receive overview information for
     */
    fetchStockRatio = async (ticker) => {
      const data = new FormData();
      data.append('ticker', ticker);

      axios
          .post(getAPIHost() + '/get_stock_overview/', data)

          .then((response) => {
            this.setState({stocks: [...this.state.stocks, {
              ticker: response.data.ticker,
              PriceToBookRatio: response.data.PriceToBookRatio,
              PERatio: response.data.PERatio,
              PEGRatio: response.data.PEGRatio,
              PriceToSalesRatioTTM: response.data.PriceToSalesRatioTTM,
              ShortRatio: response.data.ShortRatio,
            }]});
          })
          .catch((error) => {
            console.log('stock api call error', error);
          });
    };


    render() {
      return (
        <div>
          <table className="table table-striped text-white" >
            <thead className="thead-dark">
              <tr>
                <th>Watchlist</th>
              </tr>
              <tr>
                <th>Symbol</th>
                <th>P/B Ratio</th>
                <th>P/E Ratio</th>
                <th>PEG Ratio</th>
                <th>P/S Ratio</th>
                <th>Short Ratio</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stocks.map((item)=> (
                <tr key={item.id}>
                  <td>{item.ticker}</td>
                  <td>{item.PriceToBookRatio}</td>
                  <td>{item.PERatio}</td>
                  <td>{item.PEGRatio}</td>
                  <td>{item.PriceToSalesRatioTTM}</td>
                  <td>{item.ShortRatio}</td>
                </tr>
              ))}
            </tbody>

          </table>

          <div className="d-flex justify-content-between">
            <div className="row ">
              <div className="col">
                <DropdownButton id="dropdown-basic-button" variant="secondary" title="Add Stock">
                  {this.state.stock_list.map((item) => (
                    <Dropdown.Item onClick={this.addtoWatchlist}>{item}</Dropdown.Item>

                  ))}

                </DropdownButton>
              </div>

              <div className="col">
                <DropdownButton id="dropdown-basic-button" variant="secondary" title="Remove Stock">
                  {this.state.stock_list.map((item) => (
                    <Dropdown.Item onClick={this.removeFromWatchlist}>{item}</Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </div>
          </div>

        </div>
      );
    }
};


export default UserWatchlist;

