import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import './DailyTask.css';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp from Firestore

const Notifiy = ({ userId }) => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  useEffect(() => {
    const fetchWithdrawalRequests = async () => {
      // Check if withdrawal requests data is cached in local storage
      const cachedWithdrawalRequests = localStorage.getItem('withdrawalRequests');

      if (cachedWithdrawalRequests) {
        const cachedData = JSON.parse(cachedWithdrawalRequests);
        setWithdrawalRequests(cachedData);
      }

      const q = query(collection(db, 'withdrawals'), where('userId', '==', userId));

      try {
        const querySnapshot = await getDocs(q);
        const requests = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Convert Firestore Timestamp to a JavaScript Date
          const timestamp = data.timestamp.toDate();
          // Format the date as DD-MM-YYYY
          const formattedDate = `${('0' + timestamp.getDate()).slice(-2)}-${(
            '0' + (timestamp.getMonth() + 1)
          ).slice(-2)}-${timestamp.getFullYear()}`;
          data.timestamp = formattedDate;
          requests.push({ id: doc.id, ...data });
        });

        // Cache the withdrawal requests data in local storage
        localStorage.setItem('withdrawalRequests', JSON.stringify(requests));

        setWithdrawalRequests(requests);
      } catch (error) {
        console.error('Error fetching withdrawal requests:', error);
      }
    };

    fetchWithdrawalRequests();
  }, [userId]);

  return (
    <div className='withdrawal-requests-h'>
      <h2>Withdrawal Requests</h2>
      <div className='withdrwa-head'>
        <label>Req_Date</label>
        <label>Amount</label>
        <label>Status</label>
      </div>

      {withdrawalRequests.map((request) => (
        <div
          key={request.id}
          className='withdrwa-card'
          style={{
            backgroundColor: request.status === 'pending' ? '#fca5a5' : '#a3e635',
          }}
        >
          <h5>{request.timestamp}</h5>
          <h5>{request.amount}$</h5>
          <h5>{request.status}</h5>
        </div>
      ))}
    </div>
  );
};

export default Notifiy;
