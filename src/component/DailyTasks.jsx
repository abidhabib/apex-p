import React, { useState, useEffect } from 'react';
import NavBAr from './NavBAr';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase.config'; // Import your Firestore instance
import './DailyTask.css';
const DailyTasks = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Replace 'products' with your collection name
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
  return (
    <>
      <NavBAr />
      <div>
        <h1>All Products</h1>
        
          {products.map((product) => (

            <h1 key={product.id}>
<div className="notificationCard">
  <p className="notificationHeading">Push notifications</p>
  <p className="notificationPara">{product.description}</p>
  <div className="buttonContainer">
    <button className="AllowBtn"><a href={product.Link} target='_blank'>Collect</a></button>
  </div>
</div>


            </h1>
))}
        
      </div>
    </>
  );
};

export default DailyTasks;
