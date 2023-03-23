import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Clipboard, ClipboardCheckFill } from "react-bootstrap-icons";
import Linkify from "react-linkify";


export default function ReciverMessage({ reciverMsg }) {
  const [isCopy, setIsCopy] = useState(false);
  const copyToClipboard = () => {
    copy(reciverMsg?.massage);
    setIsCopy(true);
  };

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="nereferrer">
      {text}
    </a>
  );

  const getFullTime = new Date(reciverMsg?.time?.toDate()) //GET MASSAGE TIME
    ?.toLocaleTimeString()
    ?.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  
    function urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      
      return text.replace(urlRegex, function(url) {
          var hyperlink = url;
          if(!hyperlink.match('^https?:\/\/')){
              hyperlink = 'http://' + hyperlink;
          }
        return '<a className="blue" href="' + url + '" rel="noopener" noreferrer>' + url + '</a>'

      })
    }

  return (
    <div>
      <p className="reciver-chat">
        <span className="reciver-name">
          {reciverMsg?.name.length > 10
            ? reciverMsg?.name.substring(0, 10) + "..."
            : reciverMsg?.name}
        </span>
        <Linkify componentDecorator={componentDecorator}>
          {reciverMsg?.massage}
        </Linkify>
      
        <span className="copy-text" onClick={copyToClipboard}>
          {isCopy ? <ClipboardCheckFill /> : <Clipboard />}
        </span>
        <span className="reciver-time">{getFullTime}</span>
      </p>
    </div>
  );
}
