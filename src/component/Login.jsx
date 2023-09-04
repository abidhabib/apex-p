import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import './Signup.css';
import { useAuth } from '../context/UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.svg';

const Login = () => {
  const [userid, setUserId] = useState(null);
  const [checkLogin, setCheckLogin] = useState(false);
  const [checkApproved, setApproved] = useState(false);
  const [paymentOk, setPaymentOk] = useState(false);
  const { UserLogin } = useAuth();
  const [err, setError] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCheckLogin(true);
        setUserId(user.uid);
        console.log(checkLogin + '111hahah');
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userid) {
      return;
    }

    const GetData = doc(db, 'users', `${userid}`);
    const unsubscribePayment = onSnapshot(GetData, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const paymentOkValue = data.payment_ok;
        const isApproved = data.approved;
        setPaymentOk(paymentOkValue);
        setApproved(isApproved);
      } else {
        console.log('Document does not exist');
      }
    });

    return () => unsubscribePayment();
  }, [userid, checkApproved]);

  const navigate = useNavigate();

  const UserHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email === '' || password === '') {
      setError('Fill All the Fields');
      return;
    }

    try {
      const loggedIn = await UserLogin(email, password);

      if (loggedIn) {
        if (checkApproved===true) {
          navigate('/dashboard');
        } else if (paymentOk===true) {
          navigate('/processing');
        } else {
          navigate('/disclamer');
        }
      } else {
        setError('User Not Found or Invalid Credentials');
      }
    } catch (error) {
      let errorMessage = '';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User Not Found';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Wrong Password';
      } else {
        errorMessage = error.message;
      }

      setError(errorMessage);
    }
  };


  return (
    <div className="main-login">
      <div className="box">
        {err && <p className="error">{err}</p>}

        <form onSubmit={SubmitHandler} className="form">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img className="imglogo" src={logo} alt="logo" />
          </div>

          <h2>Sign in to Your Account.</h2>

          <div className="inputfield">
          <label  className='laber' htmlFor="name">Email</label>    

            <input required type="email" placeholder="_abc@xyz.com" value={user.email} name="email" onChange={UserHandler} />
          </div>

          <div className="inputfield">
          <label  className='laber' htmlFor="name">Password</label>    

            <input required type="password" placeholder="********" value={user.password} name="password" onChange={UserHandler} />
          </div>

          <div className="inputfield">
            <input type="submit" value="Login" />
          </div>

          <p className="forget">
            Don't have an Account? <Link to="signup" className="link">Sign Up</Link>
          </p>

          <p className="forget">
            <Link className="link" to="forget">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
