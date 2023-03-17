import React from 'react';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';

const App = () => {

  return (
    <div className="App">
      <ToastContainer />
      <div className="query-input">
        <p>Address:</p>
        <input id='address-input' type="text" />
        <input id='block-input' type="text" />
        <button>O</button>
      </div>
      <div className="balances">
        <p>Balances</p>
        <div className="container">
          <div className="current">
            <p id='cb-title'>Current</p>
            <p id='current-balance'>/</p>
          </div>
          <div className="specific">
            <div className="sb-header">
              <p id='sb-title'>Balance at: </p>
              <input type="date" />
            </div>
            <p id='specifi-balance'>/</p>
          </div>
        </div>
      </div>
      <div className="tansactions">
        <p>Transactions</p>
        <div className="container">
          <table>
            <thead>
              <tr>
                <td>Type</td>
                <td>Hash</td>
                <td>Time</td>
                <td>From</td>
                <td>To</td>
                <td>Value</td>
                <td>Total Fees</td>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;