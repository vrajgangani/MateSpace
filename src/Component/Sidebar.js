import React, { useEffect, useState } from "react";
import "../App.css";
import SlidebarChat from "./SlidebarChat";
import { collection } from "firebase/firestore";
import db from "../Config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import groupDP from "../assets/images/Logo.svg";
import { Button, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const [groupData, setGroupData] = useState([]); // COLLECTION OF ALL GROUP NAMES
  const [searchGroupText, setSearchGroupText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdGroupName, setCreatedGroupName] = useState("");
  const [isChatNameLoading, setisChatNameLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCreatedGroupName("");
  };

  const addNewGroup = async () => {
    if (createdGroupName) {
      await setDoc(doc(db, "groups", createdGroupName), {
        name: createdGroupName,
      });
    }
    setIsModalOpen(false);
    setCreatedGroupName("");
  };

  const searchedGroup = groupData.filter((item) => {
    return item.name.toLowerCase().includes(searchGroupText);
  });
  //SEARCHED GROUP OF ARRAY BY USER

  const onChangeSearchBox = (event) => {
    setSearchGroupText(event.target.value.toLowerCase());
  };

  const getGroupData = async () => {
    setisChatNameLoading(true);
    onSnapshot(collection(db, "groups"), (snapShopt) => {
      let list = [];
      snapShopt.docs.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setGroupData(list);
      setisChatNameLoading(false);
    });
  };

  useEffect(() => {
    getGroupData();
  }, []);

  return (
    <>
      <div className="sidebar-box">
        <div className="sidebar-navbar">
          <div className="appliaction-slidebar-header d-flex justify-content-center align-items-center">
            <img
              src={groupDP}
              alt="appliaction-logo"
              className="sidebar-header-logo"
            />
            <div className="appliaction-name">MateSpace</div>
          </div>

          <div className="search-group">
            <Input
              size="large"
              placeholder="Search Groups"
              prefix={<SearchOutlined />}
              onChange={onChangeSearchBox}
            />
          </div>

          <div className="create-group-button">
            <Button
              block
              onClick={showModal}
              size="large"
              style={{ backgroundColor: "#0078F2", color: "white" }}
            >
              Create New Group
            </Button>
            <Modal
              centered
              title="New Group Chat"
              open={isModalOpen}
              onOk={addNewGroup}
              onCancel={handleCancel}
              okText="Create"
              footer={[
                <Button
                  key="submit"
                  style={{ backgroundColor: "#0078F2", color: "white" }}
                  onClick={addNewGroup}
                >
                  Create
                </Button>,
              ]}
            >
              <Input
                placeholder="Group Name"
                onChange={(e) => setCreatedGroupName(e.target.value)}
                value={createdGroupName}
              />
            </Modal>
          </div>
        </div>

        <div className="slidebar-chatbox">
          <SlidebarChat
            searchedGroup={searchedGroup}
            isChatNameLoading={isChatNameLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
