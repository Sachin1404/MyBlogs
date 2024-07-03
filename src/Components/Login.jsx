import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../Appwrite/auth";
import { login as storeLogin } from "../Store/authSlice";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import Input from "./Input"
import Button from "./Button";
function Login(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const {register,handleSubmit}=useForm()
    const login= async(data)=>{
        try {
            setError("")
            const session=await AuthService.login(data)
            if(session){
                const userdata=await AuthService.getAccount()
                console.log(userdata)
                if(userdata){
                    dispatch(storeLogin(userdata))
                }
                navigate("/")
            }
            else{
                setError("Invalid Username or Password")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Username: "
                    placeholder="abc@myblog.com"
                    type="email"
                    {...register("email", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {
                        ...register("password",{
                            required:true,
                        })
                    }
                    />
                    <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
      )
}
export default Login;