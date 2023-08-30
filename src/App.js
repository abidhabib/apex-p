import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAuthContext, { useAuth } from './context/UserAuthContext';
import Layout from './component/Layout';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Pyment from './component/Pyment';
import Disclamer from './component/Disclamer';
import Profile from './component/Profile';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import Fourzerofour from './component/Fourzerofour';
import UserDashboard from './component/UserDashboard';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from "./firebase.config";
import PymentOkorNot from './component/PymentOkorNot';
import UserProfileUpdate from './component/UserProfileUpdate';
import AccountSettig from './component/AccountSetting';
import Protected from './component/ProtectedRoute';
import { Dashboard } from '@mui/icons-material';
import DailyTasks from './component/DailyTasks';
import Wallet from './component/Wallet';

function App() {
  const [paymentOk, setPaymentOk] = useState(false); 
  const [checklogin, setCheckLogin] = useState(false);
  const [checkapproved, setApproved] = useState();
const [userid, setuserid] = useState();
useEffect(() => {
  if (!userid) {
    return; // No need to proceed if userid is not set
  }

  const fieldsData = doc(db, 'users', `${userid}`);
  const unsubscribePayment = onSnapshot(fieldsData, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const Data = docSnapshot.data();

      // setApproved(isapproved);
const paymentOkValue = Data.pyment_ok;
const approved=Data.approved;
setApproved(approved);
console.log(checkapproved+"--checkapproved");

      setPaymentOk(paymentOkValue); // Update the state with payment_ok value
    } else {
      console.log('Document does not exist');
    }
  });

  return () => {
    unsubscribePayment();
  };
}, [userid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCheckLogin(true);
        setuserid(user.uid);
      } else {
        setCheckLogin(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  console.log(paymentOk+"--paymentOk");

  return (
    
    <UserAuthContext>
      <Router>
        <Routes>
            
            <Route index element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/protected" 
            element={
              <Protected>

                
              </Protected>
            }
            
            />
            <Route path="/home" element={<Home />} />
            <Route path="/pyment" element={
            checklogin ? <Pyment /> : <Fourzerofour />}
             />
            <Route path="/disclamer" element={( checklogin && !paymentOk) ? <Disclamer/> : <PymentOkorNot />} />
            <Route path='/processing' element={ (checklogin && paymentOk) ? <PymentOkorNot /> : <Fourzerofour />}/>
              <Route path='/dashboard' element={checkapproved ? <UserDashboard /> : <PymentOkorNot/>}/>

<Route path="/profile" element={(checklogin && checkapproved) ? <UserProfileUpdate
 /> : <Fourzerofour />} />

<Route path="/setting" element={(checklogin && checkapproved) ? <AccountSettig/> : <Fourzerofour />} />

<Route path="/dailytasks" element={(checklogin && checkapproved) ? <DailyTasks/> : <Fourzerofour />} />
<Route path="/wallet" element={(checklogin && checkapproved) ? <Wallet/> : <Fourzerofour />} />


            {/* Use a ternary operator for conditional rendering */}
            {/* <Route
              path="profile"
              element={checklogin ? <Profile /> : <Fourzerofour />}
            /> */}



        </Routes>
      </Router>
    </UserAuthContext>
  );
}

export default App;
