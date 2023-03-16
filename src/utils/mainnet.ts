import { ethers } from 'ethers';
import { NormalTx, FormatedNormalTx, formatNormalTx, TokenTx, FormatedTokenTx, formatTokenTx } from './utils';

const baseSymbol: string = process.env.REACT_APP_ETH_SYMBOL!;
const etherscanUri: string = process.env.REACT_APP_ETHERSCAN_MAINNET_URI!;
const etherscanKey: string = process.env.REACT_APP_ETHERSCAN_KEY!;
const infuraUri: string = process.env.REACT_APP_INFURA_MAINNET_URI!;
const infuraKey: string = process.env.REACT_APP_INFURA_KEY!;

const getCurrentEtherBalance = async (address: string, tag: string): Promise<string> => {
    const uri: string = `${etherscanUri}?module=account&action=balance&address=${address}&tag=${tag}&apikey=${etherscanKey}`;
    
    const response: Response = await fetch(uri);
    const json = await response.json();

    if(json.status! === 1) {
        const balance: bigint = ethers.getBigInt(json.result!);
        return `${ethers.formatEther(balance)} ${baseSymbol}`   
    }else {
        return `Error while reading current account balance: 
            Message: ${json.message!}
            Result: ${json.result!}`;
    };
};

const getNormalTransactions = async (address: string, startBlock?: number): Promise<FormatedNormalTx[] | string>=> {

    if(!startBlock) {
        startBlock = 0;
    };

    const uri: string = `${etherscanUri}?module=account&action=txlist&address=${address}&startblock=${startBlock}&apikey=${etherscanKey}`;
    
    const response: Response = await fetch(uri);
    const json = await response.json();
    
    if(json.status! === 1) {
        const transactions = json.result! as NormalTx[];
        const formatedTx: FormatedNormalTx[] = [];

        for (let i = 0; i < transactions.length; i++) {
            formatedTx.push(formatNormalTx(transactions[i], baseSymbol));
        };

        return formatedTx;
    }else {
        return `Error while reading current account balance: 
            Message: ${json.message!}
            Result: ${json.result!}`;
    };
};

const getTokenTransactions = async (address: string, startBlock?: number): Promise<FormatedTokenTx[] | string> => {

    if(!startBlock) {
        startBlock = 0;
    };
    
    const uri: string = `${etherscanUri}?module=account&action=tokentx&address=${address}&startblock=${startBlock}&apikey=${etherscanKey}`;
    
    const response: Response = await fetch(uri);
    const json = await response.json();

    if(json.status! === 1) {
        const transactions = json.result! as TokenTx[];
        const formatedTx: FormatedTokenTx[] = [];

        for (let i = 0; i < transactions.length; i++) {
            formatedTx.push(formatTokenTx(transactions[i], baseSymbol));
        };

        return formatedTx;
    }else {
        return `Error while reading current account balance: 
            Message: ${json.message!}
            Result: ${json.result!}`;
    };
};

const getAllTransactions = async (address: string, startBlock?: number): Promise<(FormatedNormalTx | FormatedTokenTx)[]> => {
    
    if(!startBlock) {
        startBlock = 0;
    };

    let frmNormalTx: any = await getNormalTransactions(address, startBlock);
    if(typeof(frmNormalTx) === 'string') {
        frmNormalTx = [];
    };

    let frmTokenTx: any = await getTokenTransactions(address, startBlock);
    if(typeof(frmNormalTx) === 'string') {
        frmTokenTx = [];
    };

    const allTx: (FormatedNormalTx | FormatedTokenTx)[] = [];

    let i = 0;
    let j = 0;

    while (i < frmNormalTx.length && j < frmTokenTx.length) {
        if (frmNormalTx[i].timeStamp < frmTokenTx[j].timeStamp) {
            allTx.push(frmNormalTx[i]);
          i++;
        } else {
            allTx.push(frmTokenTx[j]);
          j++;
        }
      }
    
      while (i < frmNormalTx.length) {
        allTx.push(frmNormalTx[i]);
        i++;
      }
    
      while (j < frmTokenTx.length) {
        allTx.push(frmTokenTx[j]);
        j++;
      }

    return allTx;
};

const getBalanceAtTime = async (date: Date, address: string) => {

    const timeStamp: number = Math.floor(date.getTime() / 1000);

    let uri: string = `${etherscanUri}?module=block&action=getblocknobytime&timestamp=${timeStamp}&closest=before&apikey=${etherscanKey}`;

    let response: Response = await fetch(uri);
    let json = await response.json();
    const block: number = Number(json.result!);
    
    uri = `${infuraUri}/${infuraKey}`;
    const data: object = {
        "jsonrpc": "2.0",
        "method": "eth_getBalance",
        "params": [
            `${address}`,
            `0x${block.toString(16)}`
        ],
        "id": 1
    };
    const options: object = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    response = await fetch(uri, options);
    json = await response.json();
    const balance: string = parseInt(json.result!, 16).toString();

    console.log(`${ethers.formatEther(balance)} ${baseSymbol}`);
};

export { getCurrentEtherBalance, getNormalTransactions, getTokenTransactions, getBalanceAtTime, getAllTransactions };