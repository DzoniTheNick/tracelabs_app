import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { formateDate, FormatedNormalTx, FormatedTokenTx } from './utils/utils'
import { normalInput } from './res/values';

import Loading from './components/Loading/Loading';
import Query from './components/Query/Query';
import Balances from './components/Balances/Balances';
import Transactions from './components/Transactions/Transactions';

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

  useEffect(() => {
    const currentDate: Date = new Date();
    setMaxDate(formateDate(currentDate));
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      {!finised && <Loading />}
      <Query 
        setFinished={setFinished}
        address={address} 
        setAddress={setAddress}
        addressStyle={addressStyle}
        setAddressStyle={setAddressStyle}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        blockNumStyle={blockNumStyle}
        setblockNumStyle={setblockNumStyle}
        setCurrentBalance={setCurrentBalance}
        setSpecificBalance={setSpecificBalance}
        setTransactions={setTransactions}
        setDate={setDate}
      />
      <Balances 
        setFinished={setFinished}
        address={address} 
        setAddressStyle={setAddressStyle}
        currentBalance={currentBalance}
        specificBalance={specificBalance}
        setSpecificBalance={setSpecificBalance}
        date={date}
        setDate={setDate}
        dateStyle={dateStyle}
        setDateStyle={setDateStyle}
        minDate={minDate}
        maxDate={maxDate}
      />
      <Transactions
        transactions={transactions} 
      />
    </div>
  );
}

export default App;