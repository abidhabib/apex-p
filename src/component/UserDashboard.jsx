import "./UserDashboard.css";
import { doc, onSnapshot } from "firebase/firestore"; // Updated import
import { db } from "../firebase.config";
import { useState, useEffect } from "react";
import profile from "../imgs/profile.png";
import settings from "../imgs/settings.png";
import noti from "../imgs/notification.png";
import coupen from "../imgs/coupen.png";
import task from "../imgs/tasks.png";
import wallet from "../imgs/wallet.png";
import team from "../imgs/team.png";
import about from "../imgs/about.png";
import flag from "../imgs/pakistan.png";
import logoutbtn from "../imgs/logout.png";
import { Link } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import SimpleImageSlider from "react-simple-image-slider";
import logo from "../imgs/logo.svg";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import NavBAr from "./NavBAr";
const UserDashboard = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Redirect or perform other actions after logout if needed
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    const images = [
        {
            url: "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/example/images/1.jpg",
        },
        {
            url: "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/example/images/2.jpg",
        },
        {
            url: "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/example/images/3.jpg",
        },
        {
            url: "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/example/images/2.jpg",
        },
    ];
    const [documentData, setDocumentData] = useState({});

    useEffect(() => {
        // Set up a real-time listener for the user's authentication state
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);

                // Set up a real-time listener for the user's data
                const unsubscribeData = onSnapshot(docRef, (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setDocumentData(docSnapshot.data());
                    } else {
                        console.log("Document does not exist");
                    }
                });

                // Clean up the data listener when the component unmounts or user changes
                return () => {
                    unsubscribeData();
                };
            }
        });

        // Clean up the authentication listener when the component unmounts
        return () => {
            unsubscribeAuth();
        };
    }, []);
    return (
        <>
            <div className="center-container">
                <div className="nav-top">
                    
                    <div className="logo-nav">
                        
                        <img className="logo-nav-img" src={logo} alt="" />
                    </div>
                </div>

                <div className="profile">
                    <div className="profile__picture">
                        <img src={documentData.imgUrl} alt="" />
                    </div>
                    <div className="profile__header">
                        <div className="profile__account">
                            <p className="profile__username">
                                {documentData.name}
                            </p>
                        </div>
                        <div className="con-log">
                            <div className="flag">
                                <img
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                    }}
                                    src={flag}
                                    alt=""
                                />
                            </div>
                            <div className="log" onClick={handleLogout}>
                                <a href="/">
                                    <img
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                        src={logoutbtn}
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="cards1">
                        <div className="cards">
                            <div className="card" id="card1">
                                <Link to="/profile" className="img-text">
                                    <img
                                        style={{
                                            width: "34px",
                                            height: "34px",
                                        }}
                                        src={profile}
                                        alt=""
                                    />
                                    <p>My Self</p>
                                </Link>
                            </div>
                            <div className="card" id="card2">
                                <div className="img-text">
                                    <img
                                        style={{
                                            width: "34px",
                                            height: "34px",
                                        }}
                                        src={coupen}
                                        alt=""
                                    />
                                    <p>Coupen</p>
                                </div>
                            </div>
                            <div className="card">
                                <Link to="/setting" className="img-text">
                                    <img
                                        style={{
                                            width: "32px",
                                            height: "33px",
                                        }}
                                        src={settings}
                                        alt=""
                                    />
                                    <p>Setting</p>
                                </Link>
                            </div>
                            <div className="card">
                                <div className="img-text">
                                    <img
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                        src={noti}
                                        alt=""
                                    />
                                    <p>Notification</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="e-x">
                <div className="eaning-sex">
                            <div className="card">
                                <div className="img-text">
                                <Link to="/dailytasks" className="img-text">

                                    <img
                                        style={{
                                            width: "34px",
                                            height: "35px",
                                            marginBottom: "4px",
                                        }}
                                        src={task}
                                        alt=""
                                    />
                                    <p style={{ fontSize: "10px" }}>
                                        DAILY TASK
                                    </p>
                                </Link>
                                </div>
                            </div>                               

                            <div className="card">
                                <div className="img-text">
                                <Link to="/wallet" className="img-text">
 
                                    <img
                                        style={{
                                            width: "34px",
                                            height: "35px",
                                            marginBottom: "4px",
                                        }}
                                        src={wallet}
                                        alt=""
                                    />
                                    <p>WALLET</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="card">
                                <div className="img-text">
                                    <img
                                        style={{
                                            width: "34px",
                                            height: "35px",
                                            marginBottom: "4px",
                                        }}
                                        src={team}
                                        alt=""
                                    />
                                    <p>TEAM</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="img-text">
                                    <img
                                        style={{
                                            width: "34px",
                                            height: "35px",
                                            marginBottom: "4px",
                                        }}
                                        src={about}
                                        alt=""
                                    />
                                    <p>ABOUT</p>
                                </div>
                            </div>
                        </div></div>
                <div className="sec-bottom">
                    
                    <div className="earning-sec">
                     
                        <div className="slider-container">
                            <div className="slider">
                                <SimpleImageSlider
                                    width={399}
                                    height={200}
                                    images={images}
                                    autoPlay={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="last-sec">
                        <p
                            style={{
                                marginLeft: "20px",
                            }}
                        >
                            Joint Efforts, Greater Savings
                        </p>
                    </div>
                    <div className="x">
                        <div className="last-sec-container">
                            <div className="left-sec"></div>
                            <div className="right-sec"></div>
                        </div>
                    </div>
                </div>


                
            </div>
        </>
    );
};

export default UserDashboard;
