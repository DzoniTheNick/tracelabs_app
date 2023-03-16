import React from 'react';

import './App.scss';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Query from './components/query/query';

const App = () => {

  return (
    <div className="app">
      <Header />
      <Query />
      <Footer />
    </div>
  );
}

export default App;
