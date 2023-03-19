import React, { useEffect } from 'react';
import { useState } from 'react';
import { isMobile, } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { FormatedNormalTx, FormatedTokenTx } from './utils/utils'
import { normalInput } from './res/values';

import Unavailable from './components/Unavailable/Unavailable';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {

  const [finised, setFinished] = useState(true);

  const [minDate] = useState<string>('2015-07-31');
  const [maxDate, setMaxDate] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [address, setAddress] = useState<string>('');
  const [blockNum, setBlockNum] = useState<string>('');
  const [currentBalance, setCurrentBalance] = useState<string>('XX.XX');
  const [specificBalance, setSpecificBalance] = useState<string>('XX.XX');
  const [transactions, setTransactions] = useState<(FormatedNormalTx | FormatedTokenTx)[]>([]);

  const [addressStyle, setAddressStyle] = useState<React.CSSProperties>(normalInput);
  const [blockNumStyle, setblockNumStyle] = useState<React.CSSProperties>(normalInput);
  const [dateStyle, setDateStyle] = useState<React.CSSProperties>(normalInput);

  return (
    <div className="App">
      <ToastContainer />
      {isMobile ? 
        <Unavailable /> : 
        <Dashboard 
          finised={finised}
          setFinished={setFinished}
          minDate={minDate}
          maxDate={maxDate}
          setMaxDate={setMaxDate}
          date={date}
          setDate={setDate}
          address={address}
          setAddress={setAddress}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          currentBalance={currentBalance}
          setCurrentBalance={setCurrentBalance}
          specificBalance={specificBalance}
          setSpecificBalance={setSpecificBalance}
          transactions={transactions}
          setTransactions={setTransactions}
          addressStyle={addressStyle}
          setAddressStyle={setAddressStyle}
          blockNumStyle={blockNumStyle}
          setblockNumStyle={setblockNumStyle}
          dateStyle={dateStyle}
          setDateStyle={setDateStyle}
        />
      }
    </div>
  );
}

export default App;