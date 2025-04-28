import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  registerSchema } from "../validation/schema"
import { z } from "zod"
import axios from "axios"
import toast from "react-hot-toast"
import { axiosBase } from "../config/baseUrl"

const Register = () => {
    const {handleSubmit,register,formState:{isSubmitting,errors}} = useForm<z.infer<typeof registerSchema>>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            fullName:'',
            username:'',
            email:"",
            password:"",
            gender:'Male'
        }
    })
    const onSubmit = async ()=>{
        try{
            const res = await axiosBase.post("auth/Register");
            if(res?.status === 201){
                toast.success("Register successfully");
            }
        }catch(error){
            if(axios.isAxiosError(error)){
                toast.error(error?.response?.data?.message)
            }else{
                toast.error("Something went wrong")
            }
        }
    }
  return (
    <div className="flex flex-col items-center justify-center max-w-96 mx-auto h-full">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">Login
                <span className="text-blue-500">Chat App</span>
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                    <label htmlFor="fullName" className="label p-2">
                        <span className="text-base label-text">Full Name</span>
                    </label>
                    <input id="fullName" {...register("fullName",{required:true})} type="text" className="w-full input input-bordered h-10"/>
                   {errors?.fullName &&  <span className="text-red-500">{errors?.fullName?.message}</span>}
                </div>
                <div>
                    <label htmlFor="username" className="label p-2">
                        <span className="text-base label-text">UserName</span>
                    </label>
                    <input id="username" {...register("username",{required:true})} type="text" className="w-full input input-bordered h-10"/>
                   {errors?.username &&  <span className="text-red-500">{errors?.username?.message}</span>}
                </div>
                <div>
                    <label htmlFor="email" className="label p-2">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input id="email" {...register("email",{required:true})} type="email" className="w-full input input-bordered h-10"/>
                   {errors?.email &&  <span className="text-red-500">{errors?.email?.message}</span>}
                </div>

                <div>
                    <label htmlFor="password" className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input id="password" {...register("password",{required:true})} type="password" className="w-full input input-bordered h-10"/>
                    {errors?.password &&  <span className="text-red-500">{errors?.password?.message}</span>}
                </div>
                <div className="flex">
                    <div className="form-control">
                        <label htmlFor="" className="label gap-2 cursor-pointer">
                            <span className="label-text">Male</span>
                            <input type="checkbox" className="checkbox border-slate-900" {...register("gender",{required:true})}/>
                        </label>
                    </div>
                    <div className="form-control">
                    <label htmlFor="" className="label gap-2 cursor-pointer">
                            <span className="label-text">Female</span>
                            <input type="checkbox" className="checkbox border-slate-900" {...register("gender",{required:true})}/>
                        </label>
                    </div>
                </div>
                <a href="#" className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block">
                    Already have an account?
                </a>
                <div>
                    <button className="btn btn-block btn-sm mt-2" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting...":"Register"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register