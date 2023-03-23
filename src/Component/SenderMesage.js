import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Clipboard, ClipboardCheckFill } from "react-bootstrap-icons";
import Linkify from "react-linkify";

export default function SenderMesage({ senderMsg }) {
  const [isCopy, setIsCopy] = useState(false);
  const copyToClipboard = () => {
    copy(senderMsg?.massage);
    setIsCopy(true);
  };

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="nereferrer">
      {text}
    </a>
  );

  const getDataBaseTime = new Date(senderMsg?.time?.toDate() || new Date()) //GET DATABASE MASSAGE TIME OR CURRENT TIME (FOR DATABASE TIME IT TAKES FEW SECOND)
    ?.toLocaleTimeString()
    ?.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

  return (
    <div>
      <p className="sender-chat">
        <Linkify componentDecorator={componentDecorator}>
          {senderMsg?.massage}
        </Linkify>

        <span className="copy-text" onClick={copyToClipboard}>
          {isCopy ? <ClipboardCheckFill /> : <Clipboard />}
        </span>
        <span className="sender-time">{getDataBaseTime}</span>
      </p>
    </div>
  );
}
