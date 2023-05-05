import React, { useState, useEffect, useRef } from 'react';
import Contents from "../Contents/Contents";
import SideBar from "../SideBar/SideBar";
import "./MainPage.css";
import NewChat from '../../Components/NewChat';
import { backendCaller } from '../../BackendCaller';

function MainPage({ username }) {
  const [messages, setMessages] = useState([]);
  const [newButtons, setNewButtons] = useState([]);
  const [currentChat, setCurrentChat] = useState('');
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null); // add state for active button index
  const [loadMessagesSignal, setLoadMessagesSignal] = useState(false); // add state for load messages

  const effectRunUser = useRef(false);

  function loadMessages(chatMessagesArray) {
    setIsSending(false);
    setCurrentChat(chatMessagesArray[0]);
    setMessages([]);
    setMessages(prevMessages => (
      [...prevMessages].concat(chatMessagesArray.slice(1).map(([_, text], i) => (
        { text: text, isUser: i % 2 === 0 }
      )))
    ));
  }

  useEffect(() => {
    if (effectRunUser.current) {
      fetch(`${backendCaller}/load/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setNewButtons([]);
          setNewButtons(prevButtons => (
            [...prevButtons].concat(data.message.map(([text], i) => (
              <button
                key={i}
                className={i === activeButtonIndex && messages.length !== 0 ? 'my-button button-clicked' : 'my-button'} // toggle class based on active button index
                onClick={() => {
                  loadMessages(data.message[i]);
                  setActiveButtonIndex(i); // set the active button index when clicked
                }}
              >
                {text}
              </button>
            )))
          ));
        });
    } else {
      effectRunUser.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, activeButtonIndex, loadMessagesSignal]);

  useEffect(() => {
    if (!effectRunUser.current) {
      if (!usernameLoaded) {
        setUsernameLoaded(true);
        fetch(`${backendCaller}/load/${username}`)
          .then((res) => res.json())
          .then((data) => {
            setNewButtons(prevButtons => (
              [...prevButtons].concat(data.message.map(([text], i) => (
                <button
                  key={i}
                  className="my-button"
                  onClick={() => loadMessages(data.message[i])} // change onClick handler
                >
                  {text}
                </button>
              )))
            ));
          });
      }
    }

    return () => {
      effectRunUser.current = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameLoaded]);

  return (
    <div className="container">
      <SideBar
        messages={messages}
        setMessages={setMessages}
        newButtons={newButtons}
        setNewButtons={setNewButtons}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        username={username}
        isSending={isSending}
        setIsSending={setIsSending}
        setActiveButtonIndex={setActiveButtonIndex}
        loadMessagesSignal={loadMessagesSignal}
        setLoadMessagesSignal={setLoadMessagesSignal}>
      </SideBar>
      {messages.length === 0 ? 
        <NewChat 
          messages={messages}
          setMessages={setMessages}
        ></NewChat> : null}
      <Contents 
        messages={messages} 
        setMessages={setMessages}
        setIsSending={setIsSending}>
      </Contents>
    </div>
  );
}

export default MainPage;
