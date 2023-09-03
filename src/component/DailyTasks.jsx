import React, { useState, useEffect } from 'react';
import NavBAr from './NavBAr';
import {
  collection,
  getDocs,
  doc,
  Timestamp,
  addDoc,
  getDoc,
  setDoc,
  where,
  query,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DailyTask.css';
import { CollectionsSharp, Money } from '@mui/icons-material';

const DailyTasks = ({ userId }) => {
  const [products, setProducts] = useState([]);
let taskCounter=1

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);

        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCollectClick = async (productId, rewardAmount, productLink) => {
    const userDocRef = doc(db, 'users', userId);
    const clickedButtonsCollection = collection(userDocRef, 'clickedButtons');
    
    try {
      const userDoc = await getDoc(userDocRef);
      let updatedBalance = userDoc.data().balance + rewardAmount; // Assuming the user's balance is stored as a number
  
      const clickedButtonQuery = query(clickedButtonsCollection, where('productId', '==', productId));
      const clickedButtonsSnapshot = await getDocs(clickedButtonQuery);
  
      if (!clickedButtonsSnapshot.empty) {
        // Button has already been clicked by the user
        toast.error('You have already Collected');
      } else {
        // Mark the button as clicked for the user
        await addDoc(clickedButtonsCollection, {
          productId,
          timestamp: Timestamp.now(),
        });
  
        // Update the user's balance
        await setDoc(userDocRef, { balance: updatedBalance }, { merge: true });
  
        // Open the product link in a new tab
        window.open(productLink, '_blank');
      }
    } catch (error) {
      console.error('Error handling button click:', error);
    }
  };
  
  
  console.log(userId);
  return (
    <>
      <NavBAr />
      <div>
        <h1 className='head'>Your's Tasks 🤹</h1>
        <p className='para'>Get ready to complete tasks and win exciting rewards on our website! Stay tuned for more details tomorrow.</p>
        {products.map((product) => (

         <div key={product.id} className="notificationCard">
            <p className="notificationHeading">Task {taskCounter++}</p>
            <p className="notificationPara">{product.description}</p>
            <div className="buttonContainer">
            <button
  className="AllowBtn"
  onClick={() => handleCollectClick(product.id, product.reward, product.Link)}
>
  Collect 🎁
</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default DailyTasks;
