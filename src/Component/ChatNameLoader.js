import { Skeleton } from "antd";
import React from "react";

export const ChatNameLoader = (props) => {
  return (
    <div className="sidebar-chat-loader d-flex justify-content-center align-items-center mb-3">
      <Skeleton.Avatar
        active={props.isChatNameLoading}
        size="large"
        style={{ marginRight: "10px" }}
      />
      <Skeleton.Input active={props.isChatNameLoading} size="large" block />
    </div>
  );
};
