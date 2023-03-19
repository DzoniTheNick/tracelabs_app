import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { formateDate, FormatedNormalTx, FormatedTokenTx } from './utils/utils'
import { normalInput, normalTxStyle, tokenTxStyle } from './res/values';

import search from './res/png/search.png';
import Loading from './components/Loading/Loading';
import { handleReset } from './utils/handlers';
import { querySpecificDateBalance, queryTransactions } from './utils/queries';

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
      <div className="query-input">
        <p id='header'>Query</p>
        <div className="inputs">
          <input id='address-input' type="text" 
            placeholder='Wallet address'
            value={address} 
            style={addressStyle} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(e.target.value);
                handleReset(setAddressStyle);
              }
            }
          />
          <input id='block-input' type="text"
            placeholder='Block height'
            value={blockNum}
            style={blockNumStyle} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBlockNum(e.target.value);
                handleReset(setblockNumStyle);
              }
            }
          />
          <button id='query-btn' onClick={() => { queryTransactions(
            address, 
            blockNum, 
            setFinished, 
            setCurrentBalance, 
            setSpecificBalance, 
            setTransactions, 
            setDate, 
            setAddressStyle, 
            setblockNumStyle) 
          }}>
            <img src={search} alt='query'/>
          </button>
        </div>
        <p id='notice'>
          Notice:<br />
          If a block number is not given the query will run from block #0<br />
          The query can retrieve a maximum of 20000 transactions
        </p>
      </div>
      <div className="balances">
        <p id='header'>Balances:</p>
        <div className="container">
          <div className="current">
            <p id='cb-title'>Current:</p>
            <p id='cb-balance'>{currentBalance}</p>
          </div>
          <div className="specific">
            <div className="sb-header">
              <p id='sb-title'>Balance at: </p>
              <input id='sb-date' type="date" min={minDate} max={maxDate} value={date}
                style={dateStyle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleReset(setDateStyle);
                    setDate(e.target.value);
                    querySpecificDateBalance(
                      e.target.value,
                      minDate,
                      address,
                      setFinished,
                      setSpecificBalance,
                      setAddressStyle,
                      setDateStyle);
                }}
              />
            </div>
            <p id='sb-balance'>{specificBalance}</p>
          </div>
        </div>
      </div>
      <div className="tansactions">
        <p id='header'>Transactions:</p>
        <table id='tx-header'>
          <thead>
            <tr>
              <td id='type'>Type</td>
              <td id='hash'>Hash</td>
              <td id='time'>Date (UTC)</td>
              <td id='from'>From</td>
              <td id='to'>To</td>
              <td id='value'>Value</td>
              <td id='total-fees'>Total Fees</td>
            </tr>
          </thead>
        </table>
        <div className="container">
          <table>
            <tbody>
                {transactions.map((transaction: FormatedNormalTx | FormatedTokenTx) => {
                  const date: Date = transaction.date;

                  const fYear: string = `${date.getFullYear()}`;
                  const fMonth: string = date.getUTCMonth() + 1 > 9 ? `${date.getUTCMonth() + 1}` : `0${date.getUTCMonth() + 1}`;
                  const fDay: string = date.getUTCDate() > 9 ? `${date.getUTCDate()}` : `0${date.getUTCDate()}`;
                  const fHours: string = date.getUTCHours() > 9 ? `${date.getUTCHours()}` : `0${date.getUTCHours()}`;
                  const fMinutes: string = date.getUTCMinutes() > 9 ? `${date.getUTCMinutes()}` : `0${date.getUTCMinutes()}`;
                  const fSeconds: string = date.getUTCSeconds() > 9 ? `${date.getUTCSeconds()}` : `0${date.getUTCSeconds()}`;

                  const formatedDate: string = `${fYear}-${fMonth}-${fDay} ${fHours}:${fMinutes}:${fSeconds}`;

                  const to: string = `https://etherscan.io/address/${transaction.to}`;
                  const from: string = `https://etherscan.io/address/${transaction.from}`;
                  const hash: string = `https://etherscan.io/tx/${transaction.txHash}`;

                  let style: React.CSSProperties = normalTxStyle;

                  if((transaction as FormatedTokenTx).tokenName) {
                    style = tokenTxStyle;
                  }

                  return(
                    <tr>
                      <td id='type'><p style={style}> {transaction.type}</p></td>
                      <td id='hash'><a href={hash} target='_blank' rel='noreferrer' style={{textDecoration: 'none'}}><p>{transaction.txHash}</p></a></td>
                      <td id='time'><p>{formatedDate}</p></td>
                      <td id='from'><a href={from} target='_blank' rel='noreferrer' style={{textDecoration: 'none'}}><p>{transaction.from}</p></a></td>
                      <td id='to'><a href={to} target='_blank' rel='noreferrer' style={{textDecoration: 'none'}}><p>{transaction.to}</p></a></td>
                      <td id='value'><p>{transaction.value}</p></td>
                      <td id='total-fees'><p>{transaction.totalFee}</p></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;