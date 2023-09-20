import React, { useEffect, useState } from "react";
import "./team.css";
import { CgCopy } from "react-icons/cg";
import { FiShare } from "react-icons/fi";
import NavBAr from "./NavBAr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  setDoc, // Import setDoc function
} from 'firebase/firestore';
import { db } from '../firebase.config';

const Team = ({ userId,Domain }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  let memCounter = 1;
  const myLink = `${Domain}/signup/${userId}`;
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamMembersCollection = collection(db, 'teamMembers');
        const teamMemberQuery = query(
          teamMembersCollection,
          where("referrerId", "in", [userId])
        );
        const teamMemberSnapshot = await getDocs(teamMemberQuery);
        const firstLevelTeamMembers = teamMemberSnapshot.docs.map(doc => doc.data());
        setTeamMembers(firstLevelTeamMembers);
  
        // Log first-level members
        console.log("First Level Members:", firstLevelTeamMembers);
  
        // Check the number of team members
        const numberOfMembers = firstLevelTeamMembers.length;
  
        // Update user's level based on the number of members
        if (numberOfMembers <= 5) {
          await updateLevelInFirestore(userId, 1);
        } else if (numberOfMembers >= 5 && numberOfMembers <= 10) {
          await updateLevelInFirestore(userId, 2);
        } else if (numberOfMembers >= 10 && numberOfMembers <= 15) {
          await updateLevelInFirestore(userId, 3);
        } else if (numberOfMembers >= 15 && numberOfMembers <= 20) {
          await updateLevelInFirestore(userId, 4);
        } else if (numberOfMembers >= 20) {
          await updateLevelInFirestore(userId, 5);
        }
  
        // Fetch second-level referrals for each first-level member
        for (const firstLevelMember of firstLevelTeamMembers) {
          const secondLevelQuery = query(
            teamMembersCollection,
            where("referrerId", "==", firstLevelMember.userId)
          );
          const secondLevelSnapshot = await getDocs(secondLevelQuery);
          const secondLevelTeamMembers = secondLevelSnapshot.docs.map(doc => doc.data());
  
          // Log second-level members for each first-level member
          console.log(`Second Level Members for ${firstLevelMember.name}:`, secondLevelTeamMembers);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };
  
    fetchTeamMembers();
  }, [userId]);
  

  // Function to update the user's level in Firestore
  const updateLevelInFirestore = async (userId, newLevel) => {
    try {
      // Reference to the user's document
      const userDocRef = doc(db, 'users', userId);

      // Update the 'level' field with the new value
      await setDoc(userDocRef, { level: newLevel }, { merge: true });

    } catch (error) {
      console.error('Error updating user level in Firestore:', error);
    }
  };

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
            {teamMembers.map((member, index) => {
              return (
                <div key={index} className="team-names">
                  <p className="counter">{memCounter++}</p>
                  <p>{member.name}</p>
                  <h5>{member.createdAt.toDate().toDateString().split(' ').slice(1).join('-')}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Team;
