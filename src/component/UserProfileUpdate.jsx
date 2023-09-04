import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { AiOutlineHome } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import logo from "../imgs/logo.svg";

import './UserProfileUpdate.css';
import { auth, db, storage } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import NavBAr from './NavBAr';

const UserProfileUpdate = () => {
  const [userid, setUserId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
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

    const userRef = doc(db, 'users', userid);
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setFullName(data.name);
        setEmail(data.email);
        setCountry(data.country);
      } else {
        console.log('Document does not exist');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userid]);

  const handlePic = (e) => {
    e.preventDefault();
    const file = e.target.files[0]; // Get the selected file

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImgUrl(downloadURL);
        setProgresspercent(0); // Reset progress bar
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setUpdating(true); // Update in progress
    
    // Get the old image URL from Firestore
    const userRef = doc(db, 'users', userid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const oldImgUrl = userData.imgUrl;

    // Delete the old image if it exists
    if (oldImgUrl) {
      const oldImgRef = ref(storage, `files/${oldImgUrl}`);
      try {
        await deleteObject(oldImgRef);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }

    // Update user data in Firestore
    try {
      await updateDoc(userRef, {
        name: fullName,
        email: email,
        country: country,
        imgUrl: imgUrl, // Include the imgUrl field
        // Update other fields similarly
      });
      
      setUpdateSuccess(true); // Update successful
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    
    setUpdating(false); // Update process complete
  };

  useEffect(() => {
    if (updateSuccess) {
      // Delay the navigation for a moment to show the success message
      const timeoutId = setTimeout(() => {
        // Redirect to dashboard after 2 seconds
       navigate('/dashboard');
      }, 2000);
      
      return () => clearTimeout(timeoutId); // Clear the timeout if component unmounts
    }
  }, [updateSuccess, navigate]);

  return (
    <> 
      <div className="user-update">
        <div className="form-box">    <NavBAr/>

          <form className="form-update" onSubmit={handleSubmit}>
            <span className="title">Update Profile</span>
            <div className="coolinput">
            <label for="name" className="text">
                  Full Name
                </label>
              <input
                type="text"
                className="input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
               <label for="name" className="text">
                  Email
                </label>
              <input
                type="text"
                className="input"
                placeholder="Email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               <label for="name" className="text">
                  Country
                </label>
              <input
                type="text"
                className="input"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
               <label for="name" className="text">
                  Select Profile Picture
                </label>
              <input  className='input' type="file"  id="fileInput"  onChange={handlePic} />
              {!imgUrl && (
                <div className="outerbar">
                  <div
                    className="innerbar"
                    style={{ width: `${progresspercent}%` }}
                  >
                    {progresspercent}%
                  </div>
                </div>
              )}
              {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
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

export default UserProfileUpdate;
