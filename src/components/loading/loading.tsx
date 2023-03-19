import React from 'react';
import './loading.scss';

import loading from '../../res/gif/loading.gif'

const Loading = () => {
  return(
    <div className="loading">
      <img src={loading} alt='Quarying data' />
    </div>
  )
}

export default Loading;
