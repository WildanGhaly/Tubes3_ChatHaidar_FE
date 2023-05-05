// import { useState, useEffect } from "react";
import TextInput from '../../Components/TextInput';
import { getSelectedValue } from "../../Components/Radio";
import './Contents.css';
import { backendCaller } from '../../BackendCaller';

function Contents({messages, setMessages, setIsSending}) {

  function appendMessage(message) {
    if (message === "") return;
    message = message.replace(/\n/g, "<br>");
    fetch(`${backendCaller}/message/${getSelectedValue()}/${encodeURIComponent(message)}`)
      .then((res) => res.json())
      .then((data) => setMessages([...messages, 
                        { text: message, isUser: true }, 
                        { text: data.message, isUser: false }
                      ]));
  }  

  function handleSend(message) {
    appendMessage(message);
    setIsSending(true);
  }

  return (
    <div className='content-container'>
      <div className="content">
        <TextInput onSend={handleSend} />
        {messages.length > 0 && (
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? "user-message" : "bot-message"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='content-footer'></div>
      <div className='content-right'></div>
      <div className='content-left'></div>
    </div>
  );
}

export default Contents;
