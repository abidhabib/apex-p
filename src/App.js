import React, {  useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAuthContext from './context/UserAuthContext';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Pyment from './component/Pyment';
import Disclamer from './component/Disclamer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import Fourzerofour from './component/Fourzerofour';
import UserDashboard from './component/UserDashboard';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from "./firebase.config";
import PymentOkorNot from './component/PymentOkorNot';
import UserProfileUpdate from './component/UserProfileUpdate';
import AccountSettig from './component/AccountSetting';
import Protected from './component/ProtectedRoute';
import DailyTasks from './component/DailyTasks';
import Wallet from './component/Wallet';
import About from './component/Messages';
import Team from './component/Team';
import Notifiy from './component/Notifications';
function App() {
  //// Domain Name / URL
  const Domain="localhost:3000";
  //
  const [paymentOk, setPaymentOk] = useState(false); 
  const [checklogin, setCheckLogin] = useState(false);
  const [checkapproved, setApproved] = useState();
const [userid, setuserid] = useState();
const [jfees, setFees] = useState(null);
const [accname, setAccname] = useState('');
const [accnumber, setAccnumber] = useState('');
const [price , setPrice] = useState(0);
const [img,setImg]=useState('');
const [user_acc_number, setUserAccNumber] = useState();
const [user_acc_name , setUserAccName] = useState();
const [user_acc_bank_name, setUserAccBankName] = useState();
const [msg, setMsg] = useState({});
const [msgRead,SetMsgRead]=useState(false)
useEffect(() => {
  if (userid) {
    const docRef = doc(db, 'settings', 'KFwh6z2LS0msPDnZRaLq');
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const joiningFee = docSnap.data();
          setAccname(joiningFee.accname);
          setAccnumber(joiningFee.accnumber);
          setFees(joiningFee.fees);
          setPrice(joiningFee.coinPrice);
          setImg(joiningFee.imageUrl);
        } else {
          console.log('Document does not exist');
        }
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
      });
  }
}, [userid]);

useEffect(() => {
  // This will log the updated fees whenever it changes
}, [jfees]);

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
const userAccNum=Data.account_number;
const userAccNAme=Data.account_title;
const userAccBankName=Data.bank_name;
const adminMsData=Data.latestNotice;
const checkRead=Data.messageRead;
setUserAccBankName(userAccBankName);
setUserAccNumber(userAccNum);
setUserAccName(userAccNAme);
setApproved(approved);
SetMsgRead(checkRead)
      setPaymentOk(paymentOkValue); 
      setMsg([adminMsData.message]);
      // Update the state with payment_ok value
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

  return (
    
    <UserAuthContext>
      <Router>
        <Routes>
            
            <Route index element={<Login />} />
            <Route path="/signup"element={<Signup />} />
            <Route path="/signup/:id" element={<Signup />} />

            <Route path="/protected" 
            element={
              <Protected>

                
              </Protected>
            }
            
            />
            <Route path="/home" element={<Home />} />
            <Route path="/pyment" element={checklogin ? <Pyment  fee={jfees}  accname={accname} accnumber={accnumber}/> : <Fourzerofour />}
             />
            <Route path="/disclamer" element={( checklogin && !paymentOk) ? <Disclamer  fee={jfees}/> : <PymentOkorNot />} />
            <Route path='/processing' element={ (checklogin && paymentOk) ? <PymentOkorNot /> : <Fourzerofour />}/>
              <Route path='/dashboard' element={checkapproved ? <UserDashboard read={msgRead} userId={userid} Domain={Domain}/> : <PymentOkorNot/>}/>

<Route path="/profile" element={(checklogin && checkapproved) ? <UserProfileUpdate
 /> : <Fourzerofour />} />

<Route path="/setting" element={(checklogin && checkapproved) ? <AccountSettig/> : <Fourzerofour />} />

<Route path="/dailytasks" element={(checklogin && checkapproved) ? <DailyTasks userId={userid}/> : <Fourzerofour />} />
<Route path="/wallet" element={(checklogin && checkapproved) ? <Wallet userId={userid} userAccNAme={user_acc_name} userAccNumber={user_acc_number} userAccBankName={user_acc_bank_name} price={price}/> : <Fourzerofour />} />
<Route path="/notice" element={(checklogin && checkapproved) ? <About msg={msg}/> : <Fourzerofour />} />
<Route path="/team" element={(checklogin && checkapproved) ? <Team userId={userid} Domain={Domain}/> : <Fourzerofour />} />
<Route path='/notifiy' element={(checklogin && checkapproved)?<Notifiy/> :<Fourzerofour/>}/>

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
