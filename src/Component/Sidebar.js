import React, { useEffect, useState } from "react";
import "../App.css";
import SlidebarChat from "./SlidebarChat";
import { collection } from "firebase/firestore";
import db from "../Config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { Person, Plus } from "react-bootstrap-icons";

const Sidebar = ({ userName }) => {
  const [groupData, setGroupData] = useState([]); // COLLECTION OF ALL GROUP NAMES
  const [searchGroupText, setSearchGroupText] = useState("");
  const addNewGroup = async () => {
    const newGroupName = prompt("Enter Your New Group Name");
    if (newGroupName) {
      await setDoc(doc(db, "groups", newGroupName), {
        name: newGroupName,
      });
    }
  };

  const searchedGroup = groupData.filter((item) => {
    return item.name.toLowerCase().includes(searchGroupText);
  });
  //SEARCHED GROUP OF ARRAY BY USER

  const onChangeSearchBox = (event) => {
    setSearchGroupText(event.target.value.toLowerCase());
  };

  const getGroupData = async () => {
    onSnapshot(collection(db, "groups"), (snapShopt) => {
      let list = [];
      snapShopt.docs.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setGroupData(list);
    });
  };

  useEffect(() => {
    getGroupData();
  }, []);

  return (
    <>
      <div className="sidebar-box">
        <div className="sidebar-navbar">
          <div className="appliaction-slidebar-header d-flex justify-content-between ">
            <div>
              <div className="appliaction-name">MateSpace</div>
            </div>
            <div className="tooltp user">
              <span className="tooltpText us">
                {userName.length > 10
                  ? userName.substring(0, 10)+"..."
                  : userName}
              </span>
              <Person className="profile-icon" />
            </div>
          </div>
          <div className="search-user-div d-flex justify-content-center align-items-center">
            <input
              type="text"
              placeholder="Search or Start a New Chat"
              className="search-user rounded-2"
              onChange={onChangeSearchBox}
            />
            <div className="slidebar-add-new-chat p-2 mx-3  rounded-2 d-flex ">
              <button className="btnn" onClick={addNewGroup}>
                <Plus />
              </button>
            </div>
          </div>
        </div>

        <div className="slidebar-chatbox">
          <SlidebarChat searchedGroup={searchedGroup} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
