import { useState } from "react";
import { BottomWarning } from "../components/BottonWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const[error,setError]=useState("")
    const navigate=useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    return <div className="bg-slate-300 h-screen flex justify-center ">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading lable={"Signup"}/>
                    <SubHeading lable={"Enter your information to create an account"}/>
                    <InputBox lable={"First Name"} placeHolder={"First name"} onChange={e=>{
                        setFirstName(e.target.value)
                    }}/>
                    <InputBox lable={"Last Name"} placeHolder={"LastName"} onChange={e=>{
                        setLastName(e.target.value)
                    }}/>
                    <InputBox lable={"Email"} placeHolder={"Email"} onChange={e=>{
                        setUserName(e.target.value)
                    }}/>
                    <InputBox lable={"Password"} placeHolder={"Password"} onChange={e=>{
                        setPassword(e.target.value)
                    }}/>
                    <Button lable={"Sign up"} onClick={async ()=>{
                        await axios.post("http://localhost:3000/api/v1/user/signup",{
                            firstName,
                            lastName,
                            userName,
                            password
                        }).then(response=>{
                            localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")
                        }).catch((err) => {
                            // Handle specific 411 error
                            if (err.response && err.response.status === 411) {
                              alert("Email already taken or incorrect input."); // Show an alert message
                              setError(err.response.data.message);
                            } else {
                              setError("An error occurred. Please try again.");
                            }
                          });
                        
                    }

                    }/>
                    {error && <div className="text-red-500 text-sm mb-1">{error}</div>}
                    <BottomWarning lable={"Already is a customer?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div> 
}