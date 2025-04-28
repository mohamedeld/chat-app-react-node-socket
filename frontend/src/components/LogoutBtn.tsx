import { BiLogOut } from "react-icons/bi"
import { axiosBase } from "../config/baseUrl";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import { useState } from "react";

const LogoutBtn = () => {
    const [loading,setLoading] = useState(false);
    const {setUser} = useAuthContext();
    const onSubmit = async ()=>{
            try{
                setLoading(true)
                const res = await axiosBase.post("auth/logout");
                if(res?.status !== 200){
                    toast.error(res?.data?.message|| res?.data?.stack);
                    return;
                }else{
                    toast.success("Logout successfully");
                    localStorage.removeItem("user-chat");
                    setUser(null);
                    setLoading(false);
                }
            }catch(error){
                if(axios.isAxiosError(error)){
                    toast.error(error?.response?.data?.message)
                }else{
                    toast.error("Something went wrong")
                }
            }finally{
                setLoading(false);
            }
        }
  return (
    <button disabled={loading} className="mt-auto" onClick={onSubmit}>
        <BiLogOut className="w-6 h-6 text-white cursor-pointer"/>
    </button>
  )
}

export default LogoutBtn