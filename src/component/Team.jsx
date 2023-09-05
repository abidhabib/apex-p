import React from "react";
import "./team.css";
import { CgCopy } from "react-icons/cg";
import { FiShare } from "react-icons/fi";
import NavBAr from "./NavBAr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Team = ({ userId }) => {
  const myLink = `localhost:3000/signup/${userId}`;
  console.log(myLink);

  return (
    <>
      <div className="team-main">
        <div className="team-layout">
          <NavBAr />
          <p className="team-h6">Unlock exclusive rewards by Sharing</p>

          <div className="card-links">
            <div
              className="share-l"
              onClick={() => window.open(myLink, "_blank")}
            >
              <FiShare className="share" />
              Share
            </div>
            <div
              className="share-l"
              onClick={() => {
                navigator.clipboard.writeText(myLink);
                toast.success("Link Copied");
              }}
            >
              {" "}
              <CgCopy className="share" />
              Copy Link
            </div>
          </div>
          
          
          
          <div className="team-mem">

          <p className="team-mem">Your Team Members</p>


          <div className="team-names">
            <p>kk</p>
          </div>

          </div>



        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Team;
