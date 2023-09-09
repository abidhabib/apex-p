import React, { useState, useEffect } from 'react';
import NavBAr from './NavBAr';
import {
  doc,
  onSnapshot,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import './DailyTask.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithdrawalRequests from './WithdrawalRequests';
import { useNavigate } from 'react-router-dom';

const Wallet = ({ userId, price, userAccNAme, userAccNumber, userAccBankName }) => {
  const [balancechange, setBalancechange] = useState(0);
  const [balance, setBalance] = useState(0);
  const [bank_balance, setBank_balance] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [navigated, setNavigated] = useState(false); // Flag to track navigation
  const navigation = useNavigate();

  useEffect(() => {
    // Reference to the user's document
    const userDocRef = doc(db, 'users', userId);

    // Listen for changes in the user's document
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userBalance = doc.data().balance;
        const userBankBalance = doc.data().bank_balance;
        setBank_balance(userBankBalance);
        setBalance(userBalance);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [userId]);

  const handelbalance = async () => {
    const userDocRef = doc(db, 'users', userId);

    if (balance === 0) {
      return;
    }

    const currentBalance = balance * price;

    try {
      // Calculate the updated balance and bank_balance
      const updatedBalance = balance - (currentBalance / price);
      const updatedBankBalance = bank_balance + currentBalance;

      // Update the Firestore document
      await updateDoc(userDocRef, {
        balance: updatedBalance,
        bank_balance: updatedBankBalance,
      });
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const handleWithdrawal = async () => {
    const userDocRef = doc(db, 'users', userId);

    if (bank_balance === 0) {
      // Show a toast message if the bank_balance is 0
      toast.warn('Earn More To Withdraw 💰', { theme: 'dark' });
      return;
    }

    if (!navigated && userAccNumber === '1234567890') {
      // If it is, navigate to the "/setting" route
      navigation('/setting');
      setNavigated(true); // Set the flag to true to prevent further withdrawals
      return;
    }

    try {
      // Withdraw the entire bank balance
      const updatedBalance = balance;
      const updatedBankBalance = 0; // Withdraw all the bank balance

      // Update the Firestore document
      await updateDoc(userDocRef, {
        balance: updatedBalance,
        bank_balance: updatedBankBalance,
      });

      // Add a withdrawal record to the "withdrawals" collection with status 'pending'
      const withdrawalRecord = {
        userId,
        amount: bank_balance,
        Account_Number: userAccNumber,
        Account_Title: userAccNAme,
        Bank_Name: userAccBankName,
        timestamp: serverTimestamp(),
        status: 'pending',
      };

      // Save the withdrawal record with 'pending' status
      await addDoc(collection(db, 'withdrawals'), withdrawalRecord);

      // Show a success toast
      toast.success('Withdrawal Request Sent ✔️', { theme: 'dark' });
    } catch (error) {
      console.error('Error handling withdrawal:', error);
      // Show an error toast
      toast.error('Error handling withdrawal. Please try again later.', { theme: 'dark' });
    }
  };

  return (
    <>
      <NavBAr />
      <div className="container-wallet">
        <div className="coins-container">
          <div className="xee-coin">
            <h3>XEE Coin</h3>
            <h4>{balance}</h4>
            <button onClick={handelbalance} className="xee-coin-btn">
              Change Currency
            </button>
          </div>
          <div className="extra-xee-coin">
            <h3>Extra XEE Coin</h3>
            <h4>99</h4>
            <button className="xee-coin-btn">Change Currency</button>
          </div>
        </div>
        <div className="bank-balance">
          <h1>
            {bank_balance} <span style={{ color: 'green' }}>$</span>
          </h1>
          <button className="xee-coin-btn" onClick={handleWithdrawal}>
            Get In Your Bank
          </button>
        </div>
      </div>
      <div className="withdrwa-requests">
        <WithdrawalRequests userId={userId} />
      </div>
      <ToastContainer />
    </>
  );
};

export default Wallet;
