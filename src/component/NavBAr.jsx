import React from 'react'
import { IoExitOutline,  } from "react-icons/io5";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { Link,  } from "react-router-dom";
import logo from "../imgs/logo.svg";
import { AiOutlineHome } from "react-icons/ai";
import "./PymentOkorNot.css";

const NavBAr = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Redirect or perform other actions after logout if needed
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };
    
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
                                <Link style={{color:'#f66871'}}to="/dashboard">   <AiOutlineHome /></Link>

                              {" "}
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
                </div>
      
      </>)
}

export default NavBAr