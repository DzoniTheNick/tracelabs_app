import React, { FC } from 'react';
import './Unavailable.scss';

import unavailable from '../../res/png/unavailable.png'; 

const Unavailable: FC = () => {
  return(
    <div className="Unavailable">
      <img src={unavailable} alt="unavailable" />
      <p>The mobile version of the application is currently unavailable</p>
    </div>
  );
}

export default Unavailable;