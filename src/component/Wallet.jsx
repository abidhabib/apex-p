import React, { useState, useEffect } from 'react';
import NavBAr from './NavBAr';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase.config'; // Import your Firestore instance
import './DailyTask.css';
const Wallet = () => {
  
  return (
    <>
      <NavBAr />
    
    </>
  );
};

export default Wallet;
