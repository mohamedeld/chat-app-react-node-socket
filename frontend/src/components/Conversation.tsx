import { IUser } from "../config/types"
import useConversation from "../store/useConversation"

interface IProps{
    user:IUser
}
const Conversation = ({user}:IProps) => {
    const {selectedConversation,setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === user?._id
  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500':''}`} onClick={()=> setSelectedConversation(user)}>
            
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src={user?.profilePic || "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"} alt="person image"/>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">{user?.fullName}</p>
                    <span className="text-xl">{user?.fullName?.toUpperCase()?.slice(0,2)}</span>
                </div>
            </div>
        </div>
        <div className="divider my-0 py-0 h-1"/>
    </>
  )
}

export default Conversation