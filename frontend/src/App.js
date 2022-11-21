import './App.css';
import { connect, sendMsg} from "./api";
import {useEffect, useState} from "react";
import Header from "./components/Header";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";

function App() {
  const [chatHistory, setChatHistory] = useState([])

  useEffect(() => {
    connect((msg) => {
      setChatHistory(prev => [...prev, msg])
    })
  },[])

  const send = (event) => {
    if (event.keyCode === 13) {
      sendMsg(event.target.value)
      event.target.value = ""
    }
  }
  return (
    <div className="App">
      <Header />
      <ChatHistory chatHistory={chatHistory}/>
      <ChatInput send={send}/>
    </div>
  );
}

export default App;
