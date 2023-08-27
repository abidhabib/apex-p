import React from 'react'
import './disclamer.css'
import Pyment from './Pyment'
import { Link } from 'react-router-dom'
import NavBAr from './NavBAr'
const Disclamer = () => {

   

  return (
<>

    <NavBAr/>


<div className="cardd">
    
 <h1 className='disclamer'>Terms and Conditions
</h1>
    <p className="desc">To Join Cashbep, You Have to Pay a Joining Fee
</p>
<h2 style={
{
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: "white"
}
}>Joining Fees 800 <span
style={
{
    color: "green"
}
}
>PKR</span> </h2>
    <ul className="lists">
        <li className="list">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Explore a range of tasks on Cashbep for daily earnings.
</span>
        </li>
        <li className="list">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Earn by interacting with various websites.</span>
        </li>
        <li className="list">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Effortlessly withdraw funds to your Easypaisa account.</span>
        </li>
        <li className="list">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Increase your income through referrals on Cashbep.</span>
        </li>
        <li className="list">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Enjoy easy withdrawals starting at Rs.100, with no referral required.</span>
        </li>
    </ul>
    <button type="button" className="action">
<Link to="/Pyment" >Submit</Link>

    </button>
</div>




</>  )
}

export default Disclamer