import { ErrorMessage, formateDate, FormatedNormalTx, FormatedTokenTx, SpecificBalance } from "./utils";

import { handleError, handleQuery } from "./handlers";
import { getAllTransactions, getBlockHeight, getEtherBalance, getLatestBlock } from "./mainnet";

const queryTransactions = async (
    address: string,
    startBlock: string,
    
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentBalance: React.Dispatch<React.SetStateAction<string>>,
    setSpecificBalance: React.Dispatch<React.SetStateAction<string>>,
    setTransactions: React.Dispatch<React.SetStateAction<(FormatedNormalTx | FormatedTokenTx)[]>>,
    setSpecificDate: React.Dispatch<React.SetStateAction<string>>,

    setAddressStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
    setBlockNumStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>): Promise<void> => {

        setFinished(false);

        // Checking if block number is valid
        // Initial frontend check
        if(startBlock.length > 0 && (!+startBlock || +startBlock < 0)) {
        if(+startBlock !== 0) {
            setFinished(true);
            setCurrentBalance('XX.XX');
            setSpecificBalance('XX.XX');
            setTransactions([]);
            setSpecificDate('');
            handleError('Invalid block value!', setBlockNumStyle);
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
        handleError("Couldn't retrieving latest block number!", setAddressStyle);
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
        handleError("Given block value doesn't exist yet!", setBlockNumStyle);
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
        handleError('Invalid address value!', setAddressStyle);
        console.error(balance);
        return;
        };

        setCurrentBalance((balance as SpecificBalance).balance);
        setSpecificBalance((balance as SpecificBalance).balance);
        setSpecificDate(formateDate(new Date()));

        const transactions: (FormatedNormalTx | FormatedTokenTx)[] = await getAllTransactions(address, +startBlock)

        setTransactions(transactions);

        let blockNum = startBlock;

        if(!blockNum) {
          blockNum = '0';
        };

        setFinished(true);
        handleQuery(`Query retrieved starting from block #${blockNum}`);
  };

const querySpecificDateBalance = async (
    date: string,
    minDate: string,
    address: string,
    
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
    setSpecificBalance: React.Dispatch<React.SetStateAction<string>>,

    setAddressStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
    setDateStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>): Promise<void> => {

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
      handleError('Invalid date selected!', setDateStyle);
      return;
    };

    const block: number = await getBlockHeight(formatedDate);

    const balance: SpecificBalance | ErrorMessage= await getEtherBalance(address, block);

    if((balance as ErrorMessage).problem) {
      setFinished(true);
      setSpecificBalance('XX.XX');
      handleError('Invalid address value!', setAddressStyle);
      console.error(balance);
      return;
    };

    setSpecificBalance((balance as SpecificBalance).balance);

    setFinished(true);
    handleQuery(`Balance retrieved from block #${(balance as SpecificBalance).blockHeight}`);
  };

export { queryTransactions, querySpecificDateBalance }