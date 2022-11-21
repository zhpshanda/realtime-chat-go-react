
const ChatInput = ({send}) => {
    return (
        <div className="ChatInput">
            <input onKeyDown={send}/>
        </div>
    )
}

export default ChatInput