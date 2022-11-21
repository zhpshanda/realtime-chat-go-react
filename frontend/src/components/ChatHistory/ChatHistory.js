import "./ChatHistory.scss";
import Message from "../Message";

const ChatHistory = ({chatHistory}) => {
    console.log(`len of chatHistory : ${chatHistory.length}`)
    const messages = chatHistory.length >0?
        chatHistory.map((msg, index) => <Message key={index} message={msg} />):
        <p>无历史消息</p>
    return (
        // <p>无历史消息</p>
        <div className="ChatHistory">
            <h2>Chat History</h2>
            {messages}
        </div>

    )
}


export default ChatHistory