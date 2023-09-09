import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AiOutlineHome } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import logo from "../imgs/logo.svg";

import "./UserProfileUpdate.css";
import { auth, db, storage } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import NavBAr from "./NavBAr";

const AccountSettig = () => {
  const [userid, setUserId] = useState(null);
  const [bankname, setBankname] = useState("");
  const [accnumber, setAccnumber] = useState("");
  const [holdername, setHoldername] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userid) {
      return;
    }

    const userRef = doc(db, "users", userid);
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setBankname(data.bank_name);
        setHoldername(data.account_title);
        setAccnumber(data.account_number);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true); // Update in progress

    // Get the old image URL from Firestore
    const userRef = doc(db, "users", userid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    // Update user data in Firestore
    try {
      await updateDoc(userRef, {
        account_number: accnumber,
        account_title: holdername,
        bank_name: bankname,
        // Update other fields similarly
      });

      setUpdateSuccess(true); // Update successful
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setUpdating(false); // Update process complete
  };

  useEffect(() => {
    if (updateSuccess) {
      // Delay the navigation for a moment to show the success message
      const timeoutId = setTimeout(() => {
        // Redirect to dashboard after 2 seconds
        navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timeoutId); // Clear the timeout if component unmounts
    }
  }, [updateSuccess, navigate]);

  return (
    <>
      <div className="user-update">
        <div className="form-box">
          {" "}
          <NavBAr />
          <form className="form-update" onSubmit={handleSubmit}>
            <span className="title">Update Profile</span>
            <div className="form-container">
              {/* <div class="input-container">
                
              </div> */}
<div class="coolinput">
<label for="name" className="text">
                  Holder Name
                </label>
                <input
                  placeholder="Jhon Dow"
                  value={holdername}
                  onChange={(e) => setHoldername(e.target.value)}
                  type="text"
                  className="input"
                />

                <label for="name" className="text">
                  Bank Name
                </label>
                <select             className="input"
 name='bankname' value={bankname}   onChange={(e) => setBankname(e.target.value)}>
              <option value=''>Set Bank</option>
              <option value='EasyPaisa'>EasyPaisa</option>
              <option value='JazzCash'>JazzCash</option>
            </select>
          


                <label for="number" className="text">
                  Account Number
                </label>
                <input
            type="text"
            className="input"
            placeholder="783477812989"
            value={accnumber}
            onChange={(e) => setAccnumber(e.target.value)}
                />
</div>
            
            </div>
            {!updating && !updateSuccess && (
              <button type="submit">Update</button>
            )}
            {updating && <div className="loading-modal">Updating...</div>}
            {!updating && updateSuccess && (
              <div className="success-message">
                Profile updated successfully! ...
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountSettig;
