import "./Signup.css";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./../firebase.config";
import { useAuth } from "../context/UserAuthContext";
import { db } from "./../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import NavBAr from "./NavBAr";


const Pyment = ({fee}) => {
    const [trx_id, setTrxId] = useState("");
    const [sender_name, setSenderName] = useState("");
    const [sender_number, setSenderPhone] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                // Update the fields in Firebase using the user's UID
                const userRef = doc(db, "users", userId);
                await updateDoc(userRef, {
                    trx_id: trx_id,
                    sender_name: sender_name,
                    sender_number: sender_number,
                    pyment_ok: true,
                    pendeing:true,
                });

                // Clear the form inputs
                setTrxId("");
                setSenderName("");
                setSenderPhone("");
                navigate('/processing'); 
            } else {
                console.log("No user is currently logged in.");
            }
        } catch (error) {
            console.log("Error updating fields:", error);
        }
    };

    return (
        <>
            <div className="box">        <NavBAr/>

                <form className="form"  onSubmit={handleFormSubmit}>
                    <div className="loading-wave">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>

                    <h2>Submit Your Transaction Details Carefully</h2>
                    <h3
                        style={{
                            color: "#ff8c00",
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >
                        Joining Fee {fee} PKR
                    </h3>
                    <ul className="lists">
                        <li className="list">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span>
                                EaisyPaisa Account{" "}
                                <span
                                    style={{
                                        fontStyle: "bold",
                                        fontFamily: "sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    03451234567
                                </span>
                            </span>
                        </li>
                        <li className="list">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span>
                                EasyPaisa Username{" "}
                                <span
                                    style={{
                                        fontStyle: "bold",
                                        fontFamily: "sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Ahmed Khan
                                </span>{" "}
                            </span>
                        </li>
                        <div className="list1">
                            <div
                                style={{
                                    textDecoration: "none",
                                    fontStyle: "bold",
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "#ff2d57",
                                    marginTop: "10px",
                                }}
                            >
                                We Receive only Pyments in Easypaisa
                            </div>
                        </div>
                    </ul>

                    <h4
                        style={{
                            color: "white",
                        }}
                    >
                        Transaction Information
                    </h4>
                    <div className="inputfield">
                        <input
                        
                            type="text"
                            required
                            placeholder="
                    TRX ID"
                            value={trx_id}
                            onChange={(e) => setTrxId(e.target.value)}
                        />
                    </div>
                    <div className="inputfield">
                        <input
                            type="text"
                            required
                            placeholder="Sender Name"
                            value={sender_name}
                            onChange={(e) => setSenderName(e.target.value)}
                        />
                    </div>
                    <div className="inputfield">
                        <input
                            type="text"
                            required
                            placeholder="Sender #Phone"
                            name="phoneNumber"
                            value={sender_number}
                            onChange={(e) => setSenderPhone(e.target.value)}
                        />
                    </div>

  <div className="inputfield">
    <input type="submit" />
  </div>
                </form>
            </div>
        </>
    );
};

export default Pyment;
