import React from "react";
import Linkify from "react-linkify";
import { CopyBlock, monoBlue } from "react-code-blocks";

export default function ReciverMessage({ reciverMsg }) {
  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="nereferrer noreferrer">
      {text}
    </a>
  );

  const getFullTime = new Date(reciverMsg?.time?.toDate()) //GET MASSAGE TIME
    ?.toLocaleTimeString()
    ?.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

  return (
    <div className="reciver-msg-container d-flex flex-column">
      <div className="d-flex align-items-center">
        <span className="reciver-name">
          {reciverMsg?.name.length > 10
            ? reciverMsg?.name.substring(0, 10) + "..."
            : reciverMsg?.name}
          <span>,</span>
        </span>
        <span className="reciver-time">{getFullTime}</span>
      </div>

      {reciverMsg.isCodeStyle ? (
        <div className="code-style-text-reciver">
          <CopyBlock
            text={reciverMsg?.massage}
            showLineNumbers={false}
            theme={monoBlue}
            codeBlock
            language="html"
          />
        </div>
      ) : (
        <pre className="reciver-chat">
          <Linkify componentDecorator={componentDecorator}>
            {reciverMsg?.massage}
          </Linkify>
        </pre>
      )}
    </div>
  );
}
