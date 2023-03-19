import React, { FC } from 'react';

import { FormatedNormalTx, FormatedTokenTx } from '../../utils/utils';
import { createTableRow } from '../../utils/formating';

import './Transactions.scss';
import { transactionsProps } from '../../utils/props';

const Transactions: FC<transactionsProps> = ({
    transactions
  }) => {
    return(
      <div className="Transactions">
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
                  return(createTableRow(transaction));
                })};
            </tbody>
          </table>
        </div>
      </div>
    )
};
  
export default Transactions;