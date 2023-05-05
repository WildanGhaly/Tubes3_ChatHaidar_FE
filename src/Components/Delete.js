// import { useEffect, useState } from "react";
import { backendCaller } from "../BackendCaller";
import "./Delete.css";

function Delete(props) {
    const { username, loadMessagesSignal, setLoadMessagesSignal, setMessages } = props;
  
    function clearConversation(username) {
        setLoadMessagesSignal(!loadMessagesSignal);
        setMessages([]);
        fetch(`${backendCaller}/clearConversation/${encodeURIComponent(username)}`)
            .then((res) => res.json())
            .then((data) => console.log(data.message)); // Log the response message to the console
    }
  
    function handleClick() {
      clearConversation(username); // Call the clearConversation function with the username
    }
  
    return (
      <div className="delete-button">
        <button onClick={handleClick}>Clear Conversation</button>
      </div>
    );
  }

export default Delete;