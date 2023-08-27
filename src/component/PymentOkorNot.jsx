import React, { useEffect, useState } from "react";
import "./PymentOkorNot.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.svg";
import { db } from '../firebase.config';
import { AiOutlineHome } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { auth } from "../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const PymentOkorNot = () => {
    const [checkapproved, setCheckApproved] = useState(false);
    const [userid, setUserId] = useState();
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        if (!userid) {
            return;
        }

        const fieldsData = doc(db, 'users', `${userid}`);
        const unsubscribePayment = onSnapshot(fieldsData, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const Data = docSnapshot.data();
                const paymentOkValue = Data.approved;
                console.log(paymentOkValue+"sexy");
                setCheckApproved(paymentOkValue);
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
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Redirect or perform other actions after logout if needed
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    useEffect(() => {
        if (checkapproved) {
            // Navigate to "/dashboard" if checkapproved is true
            navigate("/dashboard");
        }
    }, [checkapproved, navigate]);


    return (
        <>
            <div className="landing-page">
                <header>
                    <div className="container-p">
                        <ul className="links">
                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                {" "}
                                <AiOutlineHome />{" "}
                                <span
                                    style={{
                                        fontSize: "12px",
                                        marginTop: "5px",
                                    }}
                                >
                                    Home
                                </span>{" "}
                            </li>

                            <a href="#" className="logo">
                                <img
                                    className="logo-nav-img"
                                    src={logo}
                                    alt=""
                                    srcset=""
                                />
                            </a>

                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    flexDirection: "column",
                                }}
                            >
                              <Link style={{color:'#f66871'}} onClick={handleLogout} to="/"> <IoExitOutline /></Link>
                                 {""}
                                <span
                                    style={{
                                        fontSize: "12px",
                                        marginTop: "5px",
                                    }}
                                >
                                    {" "}
                                    <Link onClick={handleLogout} to="/">
                                        Logout
                                    </Link>
                                </span>{" "}
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="content">
                    <div className="container-p">
                        <div className="info">
                            <h2
                                style={{
                                    marginBottom: "20px",
                                }}
                            >
                                Team is Verifying Your Account
                            </h2>
                            <p
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                We want to inform you that our team is currently{" "}
                                <br /> in the process of verifying your account.{" "}
                                <br />
                                This is a standard procedure to ensure the
                                security and integrity of our platform. Your
                                account will active once the verification
                                process is complete. <br />
                                Please be aware that the verification process
                                might take approximately 8 to 12 hours. During
                                this time, We appreciate your patience. <br />
                                <span
                                    style={{
                                        fontSize: "20px",
                                        color: "#5900ff",
                                        marginTop: "20px",
                                    }}
                                >
                                    {" "}
                                    Thanks For Choosing Our Services
                                </span>
                            </p>
                            <button>Thanks For Patince ❤️</button>
                        </div>
                        <div className="image">
                            <div className="loaderx">
                                <p>Verifying Your </p>
                                <div className="words">
                                    <span className="word">Information</span>
                                    <span className="word">Pyments</span>
                                    <span className="word">Account</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PymentOkorNot;
