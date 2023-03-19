import React, { FC } from 'react';

import { handleReset } from '../../utils/handlers';
import { balancesProps } from '../../utils/props';
import { querySpecificDateBalance } from '../../utils/queries';

import './Balances.scss';

const Balances: FC<balancesProps> = ({
    setFinished,
    address,
    setAddressStyle,
    currentBalance,
    specificBalance,
    setSpecificBalance,
    date,
    setDate,
    dateStyle,
    setDateStyle,
    minDate,
    maxDate,
  }) => {
    return(
      <div className="Balances">
        <p id='header'>Balances:</p>
        <div className="container">
          <div className="current">
            <p id='cb-title'>Current:</p>
            <p id='cb-balance'>{currentBalance}</p>
          </div>
          <div className="specific">
            <div className="sb-header">
              <p id='sb-title'>Balance at: </p>
              <input id='sb-date' type="date" min={minDate} max={maxDate} value={date}
                style={dateStyle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleReset(setDateStyle);
                    setDate(e.target.value);
                    querySpecificDateBalance(
                      e.target.value,
                      minDate,
                      address,
                      setFinished,
                      setSpecificBalance,
                      setAddressStyle,
                      setDateStyle,
                      );
                }}
              />
            </div>
            <p id='sb-balance'>{specificBalance}</p>
          </div>
        </div>
      </div>
    )
};

export default Balances;