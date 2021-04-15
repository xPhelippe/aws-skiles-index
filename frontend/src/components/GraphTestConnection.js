import axios from 'axios';
import getAPIHost from '../components/Environment'
import React, { Component } from 'react';

class GraphTestConnection extends Component {
    state = {  }
    render() { 
        return (
            <h1>{this.props.ticker}</h1>
        );
    }
}
 
export default GraphTestConnection;
