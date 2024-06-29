import React from "react";
import Linkify from "react-linkify";
import { CopyBlock, monoBlue } from "react-code-blocks";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function SenderMesage({ senderMsg }) {
  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="nereferrer noreferrer">
      {text}
    </a>
  );

  const getDataBaseTime = new Date(senderMsg?.time?.toDate() || new Date()) //GET DATABASE MASSAGE TIME OR CURRENT TIME (FOR DATABASE TIME IT TAKES FEW SECOND)
    ?.toLocaleTimeString()
    ?.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

  return (
    <div className="sender-msg-container d-flex flex-column">
      <span className="sender-time">{getDataBaseTime}</span>
      {senderMsg.isCodeStyle ? (
        <div className="code-style-text-sender">
          <CopyBlock
            text={senderMsg?.massage}
            showLineNumbers={false}
            theme={monoBlue}
            codeBlock
            language="html"
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-centers">
          <pre className="sender-chat">
            <Linkify componentDecorator={componentDecorator}>
              {senderMsg?.massage}
            </Linkify>
          </pre>
        </div>
      )}
    </div>
  );
}
