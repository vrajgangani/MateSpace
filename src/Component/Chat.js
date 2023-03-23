import React, { useRef, useEffect, useState } from "react";
import { Send } from "react-bootstrap-icons";
import "../App.css";
import SelectImage from "../assets/images/select.svg";
import NoMassageImage from '../assets/images/noMassage.svg';
import ReciverMessage from "./ReciverMessage";
import SenderMesage from "./SenderMesage";
import groupDP from "../assets/images/Logo.svg";
import { useParams } from "react-router-dom";
import db from "../Config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export default function Chat({ userName }) {
  const name = userName;

  const { groupID } = useParams(); // SELECTED GROUP ID FROM ALL GROUPS
  const [groupName, setGroupName] = useState("");
  const [temporaryMsg, setTemporaryMsg] = useState(""); // MASGE TYPED BY USER
  const [chatMassages, setChatMassages] = useState([]); // SELECTED GROUP ALL MASSAGES ARRAY
  const bottomRef = useRef(null);

  const onSubmitMsg = async (event) => {
    event.preventDefault();
    setTemporaryMsg("");
    if (temporaryMsg) {
      try {
        await addDoc(collection(db, "groups", groupID, "massage"), {
          massage: temporaryMsg,
          name: name,
          time: serverTimestamp(),
        });
      } catch (e) {
        console.log("error from firebase to send msg", e);
      }
    }
  };

  const getGroupDataForChat = async () => {
    if (groupID) {
      // get selected group id
      const docRef = doc(db, "groups", groupID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGroupName(docSnap?.data()?.name);
      } else {
        console.log("No selected such document!");
      }
    }

    //get group chat massages
    getChatDataFromFireStore();
  };

  const getChatDataFromFireStore = () => {
    const q = query(
      collection(db, "groups", groupID, "massage"),
      orderBy("time", "asc")
    );
    onSnapshot(q, (snapshot) => {
      let tempMsg = [];
      snapshot.docs.forEach((doc) => {
        tempMsg.push({ ...doc.data() });
      });
      setChatMassages(tempMsg);
    });
  };

  useEffect(() => {
    getGroupDataForChat();
  }, [groupID]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMassages]);

  return (
    <>
      <div className="chat-box">
        {/* .............chat navabr.................. */}

        {groupName !== "" && (
          <div className="chat-navbar">
            <div className="chatbox-chat rounded-2">
              <div className="person d-flex">
                <div className="person-image ">
                  <img src={groupDP} alt="user-dp" className="userDP" />
                </div>
                <div className="person-info d-flex flex-column justify-content-center">
                  <div className="person-name">{groupName}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ....................chat show....................... */}

        {groupName !== "" ? (
          chatMassages.length === 0 ? (
            <div className="chat-display d-flex justify-content-center align-items-center ">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={NoMassageImage}
                  alt="select-group-img"
                  className="img-fluid mb-4"
                  style={{ height: "200px" }}
                />
                <div>No Massges </div>
              </div>
            </div>
          ) : (
            <div className="chat-display p-3">
              {chatMassages.map((data, index) => {
                return (
                  <div key={index}>
                    {data.name === name ? (
                      <SenderMesage senderMsg={data} />
                    ) : (
                      <ReciverMessage reciverMsg={data} />
                    )}
                  </div>
                );
              })}
              <div ref={bottomRef}></div>
            </div>
          )
        ) : (
          <div className="chat-display d-flex justify-content-center align-items-center ">
            <div className="d-flex justify-content-center align-items-center flex-column mt-5">
              <img
                src={SelectImage}
                alt="select-group-img"
                className="img-fluid mb-4"
                style={{ height: "200px",opacity:'0.9' }}
              />
              <div style={{opacity:'0.9'}}>Select Group To Get Started Or Create New</div>
            </div>
          </div>
        )}

        {/* .....................chat typing...................... */}

        {groupName !== "" && (
          <div className="chat-typing-bar">
            <form className="d-flex typing-form" onSubmit={onSubmitMsg}>
              <input
                type="text"
                value={temporaryMsg}
                placeholder="Type a massege..."
                className="type-masage-input px-2 py-2"
                onChange={(event) => setTemporaryMsg(event.target.value)}
              />
              <button type="submit" className="massage-send-button">
                <Send />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
