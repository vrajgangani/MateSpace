/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Input, Modal } from "antd";
import { Spin, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import db from "Config/firebase";
const { Text } = Typography;

//LIST OF ALL GROUPS

export default function SlidebarChat({
  searchedGroup,
  isChatNameLoading,
  setIsChatOpen,
}) {
  const navigate = useNavigate();
  const [tempPassword, setTempPassword] = useState("");
  const [isWrongPass, setIsWrongPass] = useState(false);
  const [isPassWordModel, setIsPassWordModel] = useState(false);
  const [updateGroupModel, setUpdateGroupModel] = useState(false);
  const [selectedGroupData, setSelectedGroupData] = useState("");
  const [groupName, setGroupName] = useState(selectedGroupData.name);

  const updatedObject = {
    name: groupName,
    isPrivateGroup: selectedGroupData.isPrivateGroup,
    groupPassword: selectedGroupData.groupPassword,
  };

  function checkGroupPassword(item) {
    if (item?.isPrivateGroup) {
      setIsPassWordModel(true);
    } else {
      navigate(`group/${item?.id}`);
      setIsChatOpen(true);
    }
  }

  const handleOk = () => {
    if (selectedGroupData?.isPrivateGroup) {
      if (selectedGroupData?.groupPassword === tempPassword) {
        navigate(`group/${selectedGroupData?.id}`);
        setIsPassWordModel(false);
        setTempPassword("");
        setIsChatOpen(true);
      } else {
        setIsWrongPass(true);
      }
    }
  };
  const handleCancel = () => {
    setIsPassWordModel(false);
    setTempPassword("");
    setIsWrongPass(false);
  };

  // const updateGroupName = async () => {
  //   console.log("updatename");
  //   setUpdateGroupModel(true);
  //   await setDoc(doc(db, "groups", selectedGroupData.id), updatedObject);
  //   setUpdateGroupModel(false);
  // };

  // const deleteGroupName = async () => {
  //   console.log("delted");
  //   await deleteDoc(doc(db, "groups", selectedGroupData.id));
  // };

  // const items = [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         rel="noopener noreferrer"
  //         className="text-decoration-none"
  //         onClick={updateGroupName}
  //       >
  //         Update Name
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     danger: true,
  //     label: (
  //       <a
  //         rel="noopener noreferrer"
  //         className="text-decoration-none"
  //         onClick={deleteGroupName}
  //       >
  //         Delete Name
  //       </a>
  //     ),
  //   },
  // ];

  return (
    <div className="slidebar-chat p-2 m-1">
      <Modal
        title={`${selectedGroupData?.name} is Private Group`}
        open={isPassWordModel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            style={{ backgroundColor: "#0078F2", color: "white" }}
            onClick={handleOk}
          >
            Join
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter Password"
          onChange={(e) => setTempPassword(e.target.value)}
          value={tempPassword}
        />
        {isWrongPass && <Text type="danger">Incorrect Password!</Text>}
      </Modal>

      {/* <Modal
        title={` Enter New Name`}
        open={updateGroupModel}
        onOk={updateGroupName}
        onCancel={() => setUpdateGroupModel(false)}
        footer={[
          <Button
            key="submit"
            style={{ backgroundColor: "#0078F2", color: "white" }}
            onClick={updateGroupName}
          >
            Update
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter Name"
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />
      </Modal> */}

      {isChatNameLoading ? (
        <div className="div-center">
          <Spin />
          {/* <ChatNameLoader isChatNameLoading={isChatNameLoading} /> */}
        </div>
      ) : (
        searchedGroup?.map((item, index) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={index}
              className="d-flex align-items-center justify-align-content-between "
            >
              {/* <Dropdown
                className="cursor-pointer"
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedGroupData(item);
                  }}
                >
                  <Space>
                    <MoreOutlined />
                  </Space>
                </a>
              </Dropdown> */}
              <div
                className="d-flex sidebar-chat-groupname"
                key={index}
                onClick={() => {
                  checkGroupPassword(item);
                  setSelectedGroupData(item);
                }}
                style={{ cursor: "pointer",width:"100%" }}
              >
                <div className="group-icon">
                  <Avatar
                    style={{
                      backgroundColor: "#E8EFFF",
                      color: "#0078F2",
                      height: "48px",
                      width: "48px",
                      marginRight: "10px",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    {/* IF GROUP NAME COTAINS TWO WORDS THEN CHANGE GROUP DP ACCOEDING TO NAME */}
                    {item.name.split(" ").length > 1
                      ? (
                          item.name.split(" ")[0].slice(0, 1) +
                          item.name.split(" ")[1].slice(0, 1)
                        ).toUpperCase()
                      : item?.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                </div>

                <div className="person-info d-flex flex-column justify-content-center">
                  <div className="group-name">
                    {/* IF GROUP NAME IS BIG THEN ADJUST IT IN LIMITED STRING */}
                    {item?.name.length > 25
                      ? item?.name.slice(0, 25) + "..."
                      : item?.name}
                  </div>
                </div>
                {item?.isPrivateGroup && (
                  <div
                    className="private-group-icon div-center"
                    style={{
                      marginLeft: "auto",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLock}
                      className="c-blue"
                      style={{ fontSize: "0.9rem" }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
