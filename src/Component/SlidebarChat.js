import { React, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Input, Modal } from "antd";
import { Spin, Typography } from "antd";
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
  const [selectedGroupData, setSelectedGroupData] = useState("");

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
      {isChatNameLoading ? (
        <div className="div-center">
          <Spin />
          {/* <ChatNameLoader isChatNameLoading={isChatNameLoading} /> */}
        </div>
      ) : (
        searchedGroup?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                checkGroupPassword(item);
                setSelectedGroupData(item);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex sidebar-chat-groupname">
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
