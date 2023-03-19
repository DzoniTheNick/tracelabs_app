import React, { FC } from 'react';

import { useEffect } from 'react';

import { dashboardProps } from '../../utils/props';
import { formateDate } from '../../utils/utils';
import Balances from '../Balances/Balances';
import Loading from '../Loading/Loading';
import Query from '../Query/Query';
import Transactions from '../Transactions/Transactions';

import './Dashboard.scss';

const Dashboard: FC<dashboardProps> = ({
    finised,
    setFinished,
    minDate,
    maxDate,
    setMaxDate,
    date,
    setDate,
    address,
    setAddress,
    blockNum,
    setBlockNum,
    currentBalance,
    setCurrentBalance,
    specificBalance,
    setSpecificBalance,
    transactions,
    setTransactions,
    addressStyle,
    setAddressStyle,
    blockNumStyle,
    setblockNumStyle,
    dateStyle,
    setDateStyle
  }) => {

    useEffect(() => {
      const currentDate: Date = new Date();
      setMaxDate(formateDate(currentDate));
    }, []);

    return(
      <div className="Dashboard">
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
};

export default Dashboard;
