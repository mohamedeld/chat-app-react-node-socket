import MessageInput from "./MessageInput"
import Messages from "./Messages"
import NoChatSelect from "./NoChatSelect"

const MessageContainer = () => {
    const noMessageSelected = true
  return (
    <div className="md:min-w-[450px] flex flex-col">
        {noMessageSelected ? (
            <NoChatSelect/>
        ) : (
            <>
            {/* header */}
            <div className="bg-slate-500 px-4 py-2 mb-2">
                <span className="label-text">To: </span> {" "}
                <span className="text-gray-900 font-bold">Mohamed Elrfaay</span>
            </div>
            <Messages/>
            <MessageInput/>
            </>
        )}
    </div>
  )
}

export default MessageContainer