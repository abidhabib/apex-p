import React, { useState } from 'react';
import { AuthErrorCodes } from 'firebase/auth';
import { collection, addDoc, doc, setDoc, runTransaction} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
// Import necessary Firebase and context imports
import { useAuth } from '../context/UserAuthContext';
import { db } from '../firebase.config'; // Make sure to import your Firebase configuration
import './Signup.css';
import { toast } from 'react-toastify';

const Signup = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { SignUp } = useAuth(); // Make sure to define the SignUp function in your context
  const [err, setError] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    city: '',
    completeAddress: '',
    gender: '',
  });

  const TermsHandler = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const UserHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phoneNumber, dateOfBirth, country, city, completeAddress, gender } = user;
  
    // Existing validation checks
  
    try {
      const { user: authUser } = await SignUp(email, password); // Existing user signup code
  
      // Get the next user ID using a transaction
      const counterRef = doc(db, 'counters', 'userCounter');
      const newUserId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        const currentId = counterDoc.data()?.currentId || 0;
        const newId = currentId + 1;
        transaction.update(counterRef, { currentId: newId });
        return newId;
      });
  
      // Create the user document with the auto-incremented ID
      await setDoc(doc(db, 'users', authUser.uid), {
        id: newUserId,
        name,
        email,
        phoneNumber,
        dateOfBirth,
        country,
        city,
        completeAddress,
        gender,
        createdAt: new Date(),
        balance: 0,
        sender_name: '',
        sender_number: '',
        trx_id: '',
        approved: false,
        bank_name: "Bank Name",
        account_title: "Account Holder Name",
        account_number:1234567890,
        pyment_ok: false,
        bank_balance:0,
        // You can add more user-related data here
      });
  toast.success('Account Created Successfully', {
    autoClose: 2000
  });
      navigate('/pyment');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use, try another email');
      } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError('Password must be at least 6 characters');
      } else {
        setError(err.message);
      }
    }
  };
  
  return (
    <div className='box'>
    {err && <p className='error'>{err}</p>}
    <form onSubmit={SubmitHandler} className="form">
        <h2>Registration Form</h2>
        <div className="inputfield">
<label  className='laber' htmlFor="name">Full Name</label>    

        <input type="text" required placeholder="Full Name" value={user.name} name='name' onChange={UserHandler} />
        </div>
        <div className="inputfield">
        <label className='laber' htmlFor="email">Email</label>    
            <input type="text" required placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="phone">#Phone</label>    

            <input type="number" required placeholder="+933123456789" value={user.phoneNumber} name='phoneNumber' onChange={UserHandler} />
        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="dob">Date of Birth</label>    

            <input type="date" required placeholder="Date of Birth" value={user.dateOfBirth} name='dateOfBirth' onChange={UserHandler} />
        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="country">Country</label>    

        <select name='country' value={user.country} onChange={UserHandler}>
            <option value=''>Country</option>
            <option value='Pakistan'>Pakistan</option>

            <option value='India'>India</option>
<option value='United States'>United States</option>
<option value='United Kingdom'>United Kingdom</option>
<option value='Afghanistan'>Afghanistan</option>
<option value='Albania'>Albania</option>
<option value='Algeria'>Algeria</option>
<option value='Andorra'>Andorra</option>
            <option value='Canada'>Canada</option>
            <option value='Australia'>Australia</option>

          </select>        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="city">City</label>    

            <input type="text" required placeholder="New York" value={user.city} name='city' onChange={UserHandler} />
        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="adrs">Address</label>    

            <input type="text" required placeholder="Street Address" value={user.completeAddress} name='completeAddress' onChange={UserHandler} />
        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="gender">Gender</label>    

          <select name='gender' value={user.gender} onChange={UserHandler}>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="pass">Password</label>    

            <input type="password" required placeholder="*********" value={user.password} name='password' onChange={UserHandler} />
        </div>
        <div className="inputfield">
        <label  className='laber' htmlFor="rpass">Retype Password</label>    

            <input type="password" required placeholder="**********" value={user.confirmPassword} name='confirmPassword' onChange={UserHandler} />
        </div>
        <div className="checkbox">
            <label>
                <input type="checkbox" required checked={termsAccepted} onChange={TermsHandler} />
                &nbsp;  I accept the terms and conditions
            </label>
        </div>
        <div className="inputfield">
            <input type="submit" />
        </div>
        <p className="forget">Already Have an account? <Link to={"/"} className="link">{"Login"}</Link></p>
        
    </form>
</div>
  );
};

export default Signup;
