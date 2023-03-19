import React from 'react';

import { FormatedNormalTx, FormatedTokenTx } from './utils';

interface dashboardProps {
    finised: boolean,
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
    minDate: string,
    maxDate: string,
    setMaxDate: React.Dispatch<React.SetStateAction<string>>
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    address: string,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    blockNum: string,
    setBlockNum: React.Dispatch<React.SetStateAction<string>>,
    currentBalance: string,
    setCurrentBalance: React.Dispatch<React.SetStateAction<string>>,
    specificBalance: string,
    setSpecificBalance: React.Dispatch<React.SetStateAction<string>>,
    transactions: (FormatedNormalTx | FormatedTokenTx)[],
    setTransactions: React.Dispatch<React.SetStateAction<(FormatedNormalTx | FormatedTokenTx)[]>>,
    addressStyle: React.CSSProperties,
    setAddressStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
    blockNumStyle: React.CSSProperties,
    setblockNumStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
    dateStyle: React.CSSProperties,
    setDateStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>
};

interface queryProps {
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
    address: string, 
    setAddress: React.Dispatch<React.SetStateAction<string>>, 
    addressStyle: React.CSSProperties, 
    setAddressStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
    blockNum: string,
    setBlockNum: React.Dispatch<React.SetStateAction<string>>,
    blockNumStyle: React.CSSProperties,
    setblockNumStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
    setCurrentBalance: React.Dispatch<React.SetStateAction<string>>,
    setSpecificBalance: React.Dispatch<React.SetStateAction<string>>,
    setTransactions: React.Dispatch<React.SetStateAction<(FormatedNormalTx | FormatedTokenTx)[]>>,
    setDate: React.Dispatch<React.SetStateAction<string>>
};

interface balancesProps {
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
    setAddressStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,  
    currentBalance: string,
    specificBalance: string,
    setSpecificBalance: React.Dispatch<React.SetStateAction<string>>,
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    dateStyle: React.CSSProperties,
    setDateStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
    minDate: string,
    maxDate: string,
};

interface transactionsProps {
    transactions: (FormatedNormalTx | FormatedTokenTx)[]
};

export { type dashboardProps, type queryProps, type balancesProps, type transactionsProps }