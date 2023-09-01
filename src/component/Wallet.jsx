import React, { useState, useEffect } from 'react';
import NavBAr from './NavBAr';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase.config'; // Import your Firestore instance
import './DailyTask.css';
const Wallet = () => {
  
  return (
    <>
      <NavBAr />
    <div className="container-wallet">
      <div className="coins-container">
        <div className="xee-coin">
          <h3>
            XEE Coin
          </h3>
          <h4>
            91
          </h4>
          <button  className='xee-coin-btn'> Change Currency
</button>
        </div>
        <div className="extra-xee-coin">
<h3>Extra XEE Coin
</h3>
<h4>
            99
          </h4>
          <button className='xee-coin-btn'> Change Currency
</button>
        </div>
      </div>
      <div className="bank-balance">
      <h1>
        345 <span style={{color:'green'}}>PKR</span>
      </h1>
      <button className='xee-coin-btn'> Get In Your Bank

</button></div>
    </div>
    </>
  );
};

export default Wallet;
