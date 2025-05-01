import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { axiosBase } from "../config/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { IUser } from "../config/types";

const Conversatoins = () => {
  const {user} = useAuthContext();
  const [loading,setLoading] = useState(false);
  const [conversations,setConversations] = useState([]);

  const getConversations = async ()=>{
    setLoading(true)
    try{
      const res = await axiosBase.get(`user`,{
        headers:{
          Authorization:`Bearer ${user?.token}`
        }
      });
      if(res?.status === 200){
        setConversations(res?.data?.users)
      }
    }catch(error){
      if(axios.isAxiosError(error) && error.response){
        toast.error(error?.response?.data?.message);
        return;
      }else{
        toast.error("Something went wrong")
      }
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    getConversations()
  },[])
  console.log(conversations)
  return (
    <div className="flex py-2 flex-col overflow-auto">
      {conversations?.map((item:IUser)=>{
        return (
          <Conversation key={item?._id} user={item} />
        )
      })}
      {loading && <span className="loading loading-spinner mx-auto"> </span>}
    </div>
  )
}

export default Conversatoins