import { ethers } from "ethers"

interface NormalTx {
    blockNumber: string,
    timeStamp: string,
    hash: string,
    nonce: string,
    blockHash: string,
    transactionIndex: string,
    from: string,
    to: string,
    value: string,
    gas: string,
    gasPrice: string,
    isError: string
    txreceipt_status: string,
    input: string,
    contractAddress: string,
    cumulativeGasUsed: string,
    gasUsed: string,
    confirmations: string
};

interface FormatedNormalTx {
    type: string,
    txHash: string,
    timeStamp: string,
    date: Date,
    from: string,
    to: string,
    value: string,
    totalFee: string
};

interface TokenTx {
    blockNumber: string,
    timeStamp: string,
    hash: string,
    nonce: string,
    blockHash: string,
    from: string,
    contractAddress: string,
    to: string,
    value: string,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimal: string,
    transactionIndex: string,
    gas: string,
    gasPrice: string,
    gasUsed: string,
    cumulativeGasUsed: string,
    input: string,
    confirmations: string
};

interface FormatedTokenTx {
    type: string,
    txHash: string,
    timeStamp: string,
    date: Date,
    from: string,
    to: string,
    value: string,
    ERC20Address: string,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimal: string,
    totalFee: string
};

interface SpecificBalance {
    blockHeight: string,
    balance: string
};

interface ErrorMessage {
    problem: string,
    message: string,
    result: string
}

const formateDate = (date: Date): string => {
    const year: string = (date.getUTCFullYear()).toString();

    let month: string = (date.getUTCMonth() + 1).toString();
    if(month.length < 2) {
        month = `0${month}`;
    };
    
    let day: string = (date.getUTCDate()).toString();
    if(day.length < 2) {
        day = `0${day}`;
    };

    return `${year}-${month}-${day}`;
};

const formatNormalTx = (transaction: NormalTx, baseSymbol: string): FormatedNormalTx => {

    const value: bigint = ethers.getBigInt(transaction.value);
    const formatedValue: string = ((+ethers.formatEther(value)).toFixed(5)).toString(); 
    const txFee: bigint = ethers.getBigInt(transaction.gasPrice) * ethers.getBigInt(transaction.gasUsed);
    const totalFee: bigint = value + txFee;

    const formatedNormalTx: FormatedNormalTx = {
        type: 'Normal Tx',
        txHash: transaction.hash,
        timeStamp: transaction.timeStamp,
        date: new Date(+transaction.timeStamp * 1000),
        from: transaction.from,
        to: transaction.to,
        value: `${formatedValue} ${baseSymbol}`,
        totalFee: `${(+ethers.formatEther(totalFee)).toFixed(5)} ${baseSymbol}`
    };

    return formatedNormalTx;
};

const formatTokenTx = (transaction: TokenTx, baseSymbol: string): FormatedTokenTx => {

    let value: string = ethers.formatUnits(ethers.getBigInt(transaction.value), +transaction.tokenDecimal);
    value = ((+value).toFixed(5)).toString();
    const txFee: bigint = ethers.getBigInt(transaction.gasPrice) * ethers.getBigInt(transaction.gasUsed);
    const totalFee: bigint = ethers.getBigInt('0') + txFee;

    const formatedTokenTx: FormatedTokenTx = {
        type: 'Token Tx',
        txHash: transaction.hash,
        timeStamp: transaction.timeStamp,
        date: new Date(+transaction.timeStamp * 1000),
        from: transaction.from,
        to: transaction.to,
        value: `${value} ${transaction.tokenSymbol}`,
        ERC20Address: transaction.contractAddress,
        tokenName: transaction.tokenName,
        tokenSymbol: transaction.tokenSymbol,
        tokenDecimal: transaction.tokenDecimal,
        totalFee: `${(+ethers.formatEther(totalFee)).toFixed(5)} ${baseSymbol}`
    };

    return formatedTokenTx;
};

export { type NormalTx, type FormatedNormalTx, type TokenTx, type FormatedTokenTx, type ErrorMessage, type SpecificBalance, formateDate, formatNormalTx, formatTokenTx };