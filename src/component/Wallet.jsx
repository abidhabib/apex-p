import React, { useState, useEffect } from 'react';
import NavBAr from './NavBAr';
import { collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase.config'; // Import your Firestore instance
import './DailyTask.css';
import { Balance } from '@mui/icons-material';
const Wallet = ({userId ,price}) => {
  const [balancechange, setBalancechange] = useState(0);
  const [balance, setBalance] = useState(0);

const [bank_balance, setBank_balance] = useState(0);

  useEffect(() => {
    // Reference to the user's document
    const userDocRef = doc(db, 'users', userId);

    // Listen for changes in the user's document
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        // Get the 'balance' field from the document data
        const userBalance = doc.data().balance;
        setBank_balance(doc.data().bank_balance);
        // Update the 'balance' state
        setBalance(userBalance);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [userId]); // Trigger the effect when 'userId' changes






  const handelbalance = async () => {
    // Create a reference to the user's document
    const userDocRef = doc(db, 'users', userId);
  
    // Set the 'balance' field to 0
    await updateDoc(userDocRef, {
      balance: 0
    });
  
    // Get the current balance
    if(balance===0){
      return;
    }
    const currentBalance = balance*price;
    const newbalance=bank_balance+currentBalance
    // Add a 'bank_balance' field with the current balance
    await updateDoc(userDocRef, {
      bank_balance: newbalance
    });
  
    // Update the 'balance' state
    setBalance(0);
  
    // Update the 'balancechange' state if needed
    setBalancechange(0);
  };
  
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
{            balance
}          </h4>
          <button  onClick={handelbalance}  className='xee-coin-btn' > Change Currency
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
      {bank_balance} <span style={{color:'green'}}>PKR</span>
      </h1>
      <button className='xee-coin-btn'> Get In Your Bank

</button></div>
    </div>
    </>
  );
};

export default Wallet;
