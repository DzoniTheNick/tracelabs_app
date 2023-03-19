import { ethers } from 'ethers';
import { NormalTx, FormatedNormalTx, formatNormalTx, TokenTx, ErrorMessage, FormatedTokenTx, formatTokenTx, SpecificBalance } from './utils';

const baseSymbol: string = process.env.REACT_APP_ETH_SYMBOL!;
const etherscanUri: string = process.env.REACT_APP_ETHERSCAN_MAINNET_URI!;
const etherscanKey: string = process.env.REACT_APP_ETHERSCAN_KEY!;
const infuraUri: string = process.env.REACT_APP_INFURA_MAINNET_URI!;
const infuraKey: string = process.env.REACT_APP_INFURA_KEY!;

const getEtherBalance = async (address: string, block?: number): Promise<SpecificBalance | ErrorMessage> => {
    
    if(!block) {
        block = await getBlockHeight(new Date());
    };
    
    const uri = `${infuraUri}/${infuraKey}`;

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

    const response = await fetch(uri, options);
    const json = await response.json();

    if(json.error) {
        const errorMessage: ErrorMessage = {
            problem: 'Error while reading current account balance',
            message: json.error.message!,
            result: json.error.code!
        };
        return errorMessage;
    }else {
        const balance: string = (parseInt(json.result!, 16)).toString();
        const convertedBalance: string = ((+ethers.formatEther(balance)).toFixed(5)).toString();
    
        const specificBalance: SpecificBalance = {
            blockHeight: block.toString(),
            balance: `${convertedBalance} ${baseSymbol}`
        };

        return specificBalance;
    };
};

const getBlockHeight = async (date: Date): Promise<number> => {

    const timeStamp: number = Math.floor(date.getTime() / 1000);
     
    let uri: string = `${etherscanUri}?module=block&action=getblocknobytime&timestamp=${timeStamp}&closest=before&apikey=${etherscanKey}`;

    let response: Response = await fetch(uri);
    let json = await response.json();
    const block: number = Number(json.result!);

    return block;
};

const getNormalTransactions = async (address: string, startBlock?: number): Promise<FormatedNormalTx[] | ErrorMessage>=> {

    if(!startBlock) {
        startBlock = 0;
    };

    const uri: string = `${etherscanUri}?module=account&action=txlist&address=${address}&startblock=${startBlock}&apikey=${etherscanKey}`;
    
    const response: Response = await fetch(uri);
    const json = await response.json();
    
    if(json.status! === '1') {
        const transactions = json.result! as NormalTx[];
        const formatedTx: FormatedNormalTx[] = [];

        for (let i = 0; i < transactions.length; i++) {
            formatedTx.push(formatNormalTx(transactions[i], baseSymbol));
        };

        return formatedTx;
    }else {
        const errorMessage: ErrorMessage = {
            problem: 'Error while reading current account balance',
            message: json.message!,
            result: json.result!
        };
        return errorMessage;
    };
};

const getTokenTransactions = async (address: string, startBlock?: number): Promise<FormatedTokenTx[] | ErrorMessage> => {

    if(!startBlock) {
        startBlock = 0;
    };
    
    const uri: string = `${etherscanUri}?module=account&action=tokentx&address=${address}&startblock=${startBlock}&apikey=${etherscanKey}`;
    
    const response: Response = await fetch(uri);
    const json = await response.json();

    if(json.status! === '1') {
        const transactions = json.result! as TokenTx[];
        const formatedTx: FormatedTokenTx[] = [];

        for (let i = 0; i < transactions.length; i++) {
            formatedTx.push(formatTokenTx(transactions[i], baseSymbol));
        };

        return formatedTx;
    }else {
        const errorMessage: ErrorMessage = {
            problem: 'Error while reading current account balance',
            message: json.message!,
            result: json.result!
        };
        return errorMessage;
    };
};

const getAllTransactions = async (address: string, startBlock?: number): Promise<(FormatedNormalTx | FormatedTokenTx)[]> => {
    
    if(!startBlock) {
        startBlock = 0;
    };

    let frmNormalTx: any = await getNormalTransactions(address, startBlock);
    if((frmNormalTx as ErrorMessage).message) {
        frmNormalTx = [];
    };

    let frmTokenTx: any = await getTokenTransactions(address, startBlock);
    if((frmNormalTx as ErrorMessage).message) {
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

export { getEtherBalance, getBlockHeight, getNormalTransactions, getTokenTransactions, getAllTransactions };