import { React } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { ChatNameLoader } from "./ChatNameLoader";

//LIST OF ALL GROUPS
export default function SlidebarChat({ searchedGroup, isChatNameLoading }) {
  return (
    <div className="slidebar-chat p-2 m-1">
      {isChatNameLoading ? (
        <>
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
          <ChatNameLoader isChatNameLoading={isChatNameLoading} />
        </>
      ) : (
        searchedGroup?.map((item, index) => {
          return (
            <div key={index}>
              <Link
                to={`group/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
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
                    <div className="person-name">
                      
                      {/* IF GROUP NAME IS BIG THEN ADJUST IT IN LIMITED STRING */}
                      {item?.name.length > 25
                        ? item?.name.slice(0, 25) + "..."
                        : item?.name}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
