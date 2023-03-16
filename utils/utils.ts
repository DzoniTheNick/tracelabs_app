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
    blockNumber: string,
    blockHash: string,
    txHash: string,
    timeStamp: string,
    date: Date,
    from: string,
    to: string,
    value: string,
    txFee: string,
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
    blockNumber: string,
    blockHash: string,
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
    txFee: string,
    totalFee: string
};

const formatNormalTx = (transaction: NormalTx, baseSymbol: string): FormatedNormalTx => {

    const value: bigint = ethers.getBigInt(transaction.value);
    const txFee: bigint = ethers.getBigInt(transaction.gasPrice) * ethers.getBigInt(transaction.gasUsed);
    const totalFee: bigint = value + txFee;

    const formatedNormalTx: FormatedNormalTx = {
        blockNumber: transaction.blockNumber,
        blockHash: transaction.blockHash,
        txHash: transaction.hash,
        timeStamp: transaction.timeStamp,
        date: new Date(+transaction.timeStamp * 1000),
        from: transaction.from,
        to: transaction.to,
        value: `${ethers.formatEther(value)} ${baseSymbol}`,
        txFee: `${ethers.formatEther(txFee)} ${baseSymbol}`,
        totalFee: `${ethers.formatEther(totalFee)} ${baseSymbol}`
    };

    return formatedNormalTx;
};

const formatTokenTx = (transaction: TokenTx, baseSymbol: string): FormatedTokenTx => {

    const value: string = ethers.formatUnits(ethers.getBigInt(transaction.value), +transaction.tokenDecimal);
    const txFee: bigint = ethers.getBigInt(transaction.gasPrice) * ethers.getBigInt(transaction.gasUsed);
    const totalFee: bigint = ethers.getBigInt('0') + txFee;

    const formatedTokenTx: FormatedTokenTx = {
        blockNumber: transaction.blockNumber,
        blockHash: transaction.blockHash,
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
        txFee: `${ethers.formatEther(txFee)} ${baseSymbol}`,
        totalFee: `${ethers.formatEther(totalFee)} ${baseSymbol}`
    };

    return formatedTokenTx;
};

export { NormalTx, FormatedNormalTx, TokenTx, FormatedTokenTx, formatNormalTx, formatTokenTx };