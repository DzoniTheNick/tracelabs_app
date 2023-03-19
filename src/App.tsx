import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { ErrorMessage, formateDate, FormatedNormalTx, FormatedTokenTx, SpecificBalance } from './utils/utils'
import { getLatestBlock, getEtherBalance, getBlockHeight, getAllTransactions } from './utils/mainnet';
import { errorBackgroundColor, errorBorder, normalBackgroundColor, normalBorder } from './utils/values';

import search from './res/png/search.png';
import Loading from './components/Loading/Loading';

const App = () => {

  const [finised, setFinished] = useState(true);

  const [minDate] = useState<string>('2015-07-31');
  const [maxDate, setMaxDate] = useState<string>('');
  const [specificDate, setSpecificDate] = useState<string>('');

  const [address, setAddress] = useState<string>('');
  const [startBlock, setStartBlock] = useState<string>('');
  const [currentBalance, setCurrentBalance] = useState<string>('XX.XX');
  const [specificBalance, setSpecificBalance] = useState<string>('XX.XX');
  const [transactions, setTransactions] = useState<(FormatedNormalTx | FormatedTokenTx)[]>([]);

  const [addressBackground, setAddressBackground] = useState(normalBackgroundColor);
  const [addressBorder, setAddressBorder] = useState(normalBorder);
  const [blockBackground, setBlockBackground] = useState(normalBackgroundColor);
  const [blockBorder, setBlockBorder] = useState(normalBorder);
  const [dateBackground, setDateBackground] = useState(normalBackgroundColor);
  const [dateBorder, setDateBorder] = useState(normalBorder);

  useEffect(() => {
    const currentDate: Date = new Date();
    setMaxDate(formateDate(currentDate));
  }, []);

  const handleError = (message: string, setBackgroundColor: React.Dispatch<React.SetStateAction<string>>, setBorder: React.Dispatch<React.SetStateAction<string>>) => {
    setBackgroundColor(errorBackgroundColor);
    setBorder(errorBorder);
    toast(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleReset = (setBackgroundColor: React.Dispatch<React.SetStateAction<string>>, setBorder: React.Dispatch<React.SetStateAction<string>>) => {
    setBackgroundColor(normalBackgroundColor);
    setBorder(normalBorder);
  };

  const handleQuery = (message: string) => {
    toast(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  const queryTransactions = async () => {

    setFinished(false);

    // Checking if block number is valid
    // Initial frontend check
    if((startBlock as string).length > 0 && (!+startBlock || +startBlock < 0)) {
      if(+startBlock !== 0) {
        setFinished(true);
        setCurrentBalance('XX.XX');
        setSpecificBalance('XX.XX');
        setTransactions([]);
        setSpecificDate('');
        handleError('Invalid block value!', setBlockBackground, setBlockBorder);
        return;
      };
    };

    // On chain check (if block exists)
    const lastestBlock: number | ErrorMessage = await getLatestBlock();

    if((lastestBlock as ErrorMessage).problem) {
      setFinished(true);
      setCurrentBalance('XX.XX');
      setSpecificBalance('XX.XX');
      setTransactions([]);
      setSpecificDate('');
      handleError("Couldn't retrieving latest block number!", setBlockBackground, setBlockBorder);
      console.error(lastestBlock);
      return;
    };

    // Checking if entered block value exists on the blockchain
    if(+startBlock > lastestBlock) {
      setFinished(true);
      setCurrentBalance('XX.XX');
      setSpecificBalance('XX.XX');
      setTransactions([]);
      setSpecificDate('');
      handleError("Given block value doesn't exist yet!", setBlockBackground, setBlockBorder);
      return;
    }

    const balance: SpecificBalance | ErrorMessage = await getEtherBalance(address);

    // Checking if address is valid
    if((balance as ErrorMessage).problem || !address) {
      setFinished(true);
      setCurrentBalance('XX.XX');
      setSpecificBalance('XX.XX');
      setTransactions([]);
      setSpecificDate('');
      handleError('Invalid address value!', setAddressBackground, setAddressBorder);
      console.error(balance);
      return;
    };

    setCurrentBalance((balance as SpecificBalance).balance);
    setSpecificBalance((balance as SpecificBalance).balance);
    setSpecificDate(formateDate(new Date()));

    const transactions: (FormatedNormalTx | FormatedTokenTx)[] = await getAllTransactions(address, +startBlock)

    setTransactions(transactions);

    setFinished(true);
    handleQuery(`Query retrieved up to block #${startBlock}`);
  };

  const querySpecificDateBalance = async (date: string) => {

    setFinished(false);

    const formatedDate: Date = new Date(date);
    formatedDate.setUTCHours(0, 0, 0, 0);

    // Checking if entered date value is valid
    const beginning: Date = new Date(minDate);
    beginning.setUTCHours(0, 0, 0, 0); 
    const end: Date = new Date();
    end.setUTCHours(0, 0, 0, 0); 

    if(beginning > formatedDate || formatedDate > end) {
      setFinished(true);
      setSpecificBalance('XX.XX');
      handleError('Invalid date selected!', setDateBackground, setDateBorder);
      return;
    };

    const block: number = await getBlockHeight(formatedDate);

    const balance: SpecificBalance | ErrorMessage= await getEtherBalance(address, block);

    if((balance as ErrorMessage).problem) {
      setFinished(true);
      setSpecificBalance('XX.XX');
      handleError('Invalid address value!', setAddressBackground, setAddressBorder);
      console.error(balance);
      return;
    };

    setSpecificBalance((balance as SpecificBalance).balance);

    setFinished(true);
    handleQuery(`Query retrieved from block #${(balance as SpecificBalance).blockHeight}`);
  };

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
            style={{
              backgroundColor: addressBackground,
              border: addressBorder
            }} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(e.target.value);
                handleReset(setAddressBackground, setAddressBorder);
              }
            }
          />
          <input id='block-input' type="text"
            placeholder='Block height'
            value={startBlock}
            style={{
              backgroundColor: blockBackground,
              border: blockBorder
            }} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStartBlock(e.target.value);
                handleReset(setBlockBackground, setBlockBorder);
              }
            }
          />
          <button id='query-btn' onClick={() => { queryTransactions() }}>
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
              <input id='sb-date' type="date" min={minDate} max={maxDate} value={specificDate}
                style={{
                  background: dateBackground,
                  border: dateBorder
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleReset(setDateBackground, setDateBorder);
                    setSpecificDate(e.target.value);
                    querySpecificDateBalance(e.target.value);
                  }
                }
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

                  let style: React.CSSProperties = {
                    background: 'rgba(0, 161, 134, 0.1)',
                    color: 'rgb(0 161 134)',
                    border: '1px solid rgb(0 161 134)',
                    borderRadius: '5px'
                  };

                  if((transaction as FormatedTokenTx).tokenName) {
                    style = {
                      background: 'rgba(204, 154, 6, 0.15)',
                      color: 'rgb(204, 154, 6)',
                      border: '1px solid rgb(204, 154, 6)',
                      borderRadius: '5px'
                    };
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