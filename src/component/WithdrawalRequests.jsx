// WithdrawalRequests.js
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import './DailyTask.css';

const WithdrawalRequests = ({ userId }) => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  useEffect(() => {
    const fetchWithdrawalRequests = async () => {
      const q = query(collection(db, 'withdrawals'), where('userId', '==', userId));

      try {
        const querySnapshot = await getDocs(q);
        const requests = [];
        querySnapshot.forEach((doc) => {
            
          requests.push({ id: doc.id, ...doc.data() });
        });
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
      <div className="withdrwa-head">
      <label>Req_Date</label>

        <label>Amount</label>
        <label >Status</label>
      </div>
      

        {withdrawalRequests.map((request) => (
          <div key={request.id} className='withdrwa-card'>
                          <h5>{request.timestamp.toDate().toDateString().split(' ').slice(1).join('-')}</h5>

                          <h5>{request.amount}$</h5>
                          <h5 >{request.status}</h5>


            {/* Amount: {request.amount} PKR, Status: {request.status} */}
          </div>
        ))}
      
    </div>
  );
};

export default WithdrawalRequests;
