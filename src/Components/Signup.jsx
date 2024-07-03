import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../Appwrite/auth";
import { login as storeLogin } from "../Store/authSlice";
import Input from "./Input";
import Logo from "./Logo";
import Button from "./Button";
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit,formState: { errors }} = useForm()

    const create = async(data) => {
        setError("")
        try {
            console.log("data received")
            const userdata = await AuthService.createAccount(data)
            if (userdata) {
                const userdata = await AuthService.getAccount()
                if(userdata) dispatch(storeLogin(userdata));
                navigate("/")
            }
            else{
                setError("Inavlid Username or password")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                         label="Username: "
                         placeholder="abc@myblog.com"
                         type="email"
                         {...register("email", {
                          required: true,
                          pattern: {
                                    value: /^\w+([.-]?\w+)*@myblog\.com$/,
                                    message: "Username must end with @myblog.com",
                                    },
                                })}
                              />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        <Input
                        label="Password(Longer than 8 characters): "
                        type="password"
                        placeholder="Create your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup;