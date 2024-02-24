import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import SelectImage from "../assets/images/select.svg";
import NoMassageImage from "../assets/images/noMassage.svg";
import ReciverMessage from "./ReciverMessage";
import SenderMesage from "./SenderMesage";
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
import { Avatar } from "antd";
import EmojiPicker from "emoji-picker-react";
import { ArrowLeft, CodeSlash, EmojiSmile } from "react-bootstrap-icons";

export default function Chat({ userName, isChatOpen, setIsChatOpen }) {
  const name = userName;

  const { groupID } = useParams(); // SELECTED GROUP ID FROM ALL GROUPS
  const [groupName, setGroupName] = useState("");
  const [temporaryMsg, setTemporaryMsg] = useState(undefined); // MASGE TYPED BY USER
  const [chatMassages, setChatMassages] = useState([]); // SELECTED GROUP ALL MASSAGES ARRAY
  const [showEmojiPicker, setEmojiShowPicker] = useState(false);
  const [isCodeStyle, setisCodeStyle] = useState(false);
  const bottomRef = useRef(null);
  const codeSelected = isCodeStyle && "#0078F2";

  const onEmojiClick = (event) => {
    setTemporaryMsg((prevInput) => prevInput + event.emoji);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmitMsg();
    }
  };

  const onSubmitMsg = async (event) => {
    if (event) {
      event.preventDefault();
    }
    // setTemporaryMsg("");
    setEmojiShowPicker(false);

    if (!!temporaryMsg.trim().length) {
      // CHECKS MSG IF NOT CONTAINS ANY EMPTY SPACE  OR NULL VALUE
      try {
        addDoc(collection(db, "groups", groupID, "massage"), {
          //NO NEED TO AWAIT BEACUSE WE SEND DATA TO DATABASE
          massage: temporaryMsg,
          name: name,
          time: serverTimestamp(),
          isCodeStyle: isCodeStyle,
        });
      } catch (e) {
        console.log("error from firebase to send msg", e);
      }
    }
    setTemporaryMsg("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="chatbox-chat ">
              <div className="person d-flex align-items-center">
                {isChatOpen && (
                  <ArrowLeft
                    onClick={() => setIsChatOpen(false)}
                    style={{ margin: "0px 7px 0px 7px", fontSize: "1.2rem" }}
                  />
                )}
                <div className="group-icon">
                  <Avatar
                    style={{
                      backgroundColor: "#E8EFFF",
                      color: "#0078F2",
                      height: "40px",
                      width: "40px",
                      marginRight: "10px",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    {groupName.slice(0, 2).toUpperCase()}
                  </Avatar>
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
            <div className="chat-display">
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
                style={{ height: "200px", opacity: "0.9" }}
              />
              <div style={{ opacity: "0.9" }}>
                Select Group To Get Started Or Create New
              </div>
            </div>
          </div>
        )}

        {/* .....................chat typing...................... */}
        {groupName !== "" && (
          <>
            <div className="div-center mb-0">
              {showEmojiPicker && (
                <EmojiPicker
                  height="300px"
                  width="80%"
                  onEmojiClick={onEmojiClick}
                  searchDisabled={true}
                  reactionsDefaultOpen={true}
                  previewConfig={{ showPreiew: false }}
                />
              )}
            </div>
            <form
              onSubmit={onSubmitMsg}
              className="chat-typing-bar"
            >
              <div className="chat-typing-tools flex items-center rounded-5 bgc-light-blue ">
                <button
                  type="button"
                  className="emoji-button text-xl rounded-2 cursor-pointer"
                  onClick={() => setEmojiShowPicker((val) => !val)}
                >
                  <EmojiSmile />
                </button>
                <button
                  type="button"
                  className="code-button inline-flex justify-center text-xl  rounded-2 cursor-pointer hover:text-[#0078F2]"
                  onClick={() => setisCodeStyle(!isCodeStyle)}
                >
                  <CodeSlash style={{ color: codeSelected }} />
                </button>

                <textarea
                  rows="1"
                  className="chat-type-textarea block mx-0 w-full text-md text-dark-900 bg-transparent rounded-lg focus:outline-none "
                  placeholder="Type a message..."
                  onKeyDown={handleKeyDown}
                  value={temporaryMsg}
                  onChange={(event) => setTemporaryMsg(event.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="send-button inline-flex justify-center rounded-5 text-blue-600 cursor-pointer hover:bg-blue-100 bgc-light-blue"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
