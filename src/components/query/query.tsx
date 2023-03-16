import React from 'react';
import { useState } from 'react';

import './query.scss';

const Query = () => {

  const [address, setAddress] = useState('');
  const [startBlock, setStartBlock] = useState('');

  return(
    <div className="query">
      <div className="wallet-address">
        <p>Enter wallet address</p>
        <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAddress(e.target.value)}}/>
      </div>
      <div className="block-height">
        <p>Enter start block height</p>
        <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setStartBlock(e.target.value)}}/>
      </div>
      <button onClick={() => {}}>Query wallet transactions</button>
    </div>
  );
}

export default Query;