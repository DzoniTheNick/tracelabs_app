import React from 'react';
import './Loading.scss';

import loading from '../../res/gif/loading.gif';

const Loading = () => {
  return(
    <div className="Loading">
      <img src={loading} alt="querying" />  
    </div>
  )
}

export default Loading;