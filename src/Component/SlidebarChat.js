import React from "react";
import groupDP from "../assets/images/Logo.svg";
import "../App.css";
import { Link } from "react-router-dom";

export default function SlidebarChat({ addNewChat, searchedGroup }) {
  return searchedGroup?.map((item, index) => {
    return (
      <div key={index}>
        {addNewChat ? (
          {
            /* <div className="slidebar-add-new-chat p-2 mx-3  rounded-2 d-flex ">
            <button className="btn" onClick={addNewGroup}>
              Add New Group
            </button>
          </div> */
          }
        ) : (
          <Link
            to={`group/${item.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="slidebar-chat p-2 m-1 rounded-2">
              <div className="person d-flex">
                <div className="person-image ">
                  <img src={groupDP} alt="user-dp" className="userDP"/>
                </div>
                <div className="person-info d-flex flex-column justify-content-center">
                  <div className="person-name">
                    {item?.name}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    );
  });
}
