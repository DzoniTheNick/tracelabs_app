import React, { FC } from 'react';

import { queryProps } from '../../utils/props';

import { handleReset } from '../../utils/handlers';
import { queryTransactions } from '../../utils/queries';

import './Query.scss';
import search from '../../res/png/search.png';

const Query: FC<queryProps> = ({
    setFinished,
    address, 
    setAddress, 
    addressStyle, 
    setAddressStyle,
    blockNum,
    setBlockNum,
    blockNumStyle,
    setblockNumStyle,
    setCurrentBalance,
    setSpecificBalance,
    setTransactions,
    setDate
  }) => {
    return(
      <div className="Query">
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
    )
};

export default Query;