import axios from "axios";
import { BottomWarning } from "../components/BottonWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";


export default function Signin(){
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const[error,setError]=useState("")
    const navigate=useNavigate()
    return <div  className="bg-slate-300 h-screen flex items-center justify-center">
    <div className="absolute top-2 w-full">
        <AppBar initial={""} />
    </div>
            <div className="flex flex-col justify-center">
                <div className="rounded-lg  bg-white w-80 text-center p-2 h-max px-4 shadow">
                    <Heading lable={"Signin"}/>
                    <SubHeading lable={"Enter login information"}/>
                    <InputBox lable={"Email"} placeHolder={"Email"} onChange={(e)=>{
                        setUserName(e.target.value)
                    }}/>
                    <InputBox type={"password"}  lable={"Password"} placeHolder={"Password"} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <Button lable={"Sign in"} onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/user/signin",{
                            userName,
                            password
                        }).then(response=>{
                            localStorage.setItem("token",response.data.token)
                            navigate("/dashboard")
                        }).catch(err=>{
                            if(err.response && err.response.status==411){
                                alert(err.response.data.message)
                                setError(err.response.data.message);
                            }
                        })
                        
                        
                    }}/>
                    {error && <div className="flex text-xs text-red-500 pl-2">{error}</div>}
                    <BottomWarning lable={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
            </div>
        </div> 
}