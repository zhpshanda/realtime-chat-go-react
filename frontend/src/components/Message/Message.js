
import "./Message.scss"

const Message = (props) => {
    return (
        <div className="Message">Client-{props.message.clientID}: {props.message.body}</div>
    )
}

export default Message