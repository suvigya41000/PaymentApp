import { useNavigate, useSearchParams } from "react-router-dom"
import { InputBox } from "./InputBox"
import axios from "axios"
import { useState } from "react"
export const SendMoney=()=>{
    const navigate=useNavigate();
    const[error,setError]=useState("");
    const[amount,setAmount]=useState(0) 
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const firstName=searchParams.get("name");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
                <div className="rounded-md bg-white w-80 text-center p-2 h-max px-4">
                    <div className="flex flex-col justify-center font-bold py-4 text-2xl">Send Money</div>
                    <div className="flex pt-4">
                        <div className="flex flex-col rounded-full bg-green-500 h-12 w-12 justify-center text-2xl font-semibold hover:bg-green-600 text-white">{firstName[0]}</div>
                        <div className="flex flex-col justify-center px-2 text-lg font-bold">{firstName}</div>
                    </div>
                    <div className="flex py-2 font-bold text-sm">Amount (in Rs)</div>
                    <InputBox onChange={(e)=>{
                        setAmount(e.target.value)
                    }} placeHolder={"Enter Amount"}/>
                    <button onClick={()=>{
                            axios.post('http://localhost:3000/api/v1/account/transfer',{
                                to:id,
                                amount:Number(amount)
                            },{
                                headers:{
                                    authorization:"Bearer "+localStorage.getItem("token")
                                }
                            }).then((response)=>{
                                alert(response.data.message)
                                navigate("/dashboard")
                            }).catch((err) => {
                                // Handle specific 411 error
                                if (err.response && err.response.status === 400) {
                                  alert(err.response); // Show an alert message
                                  setError(err.response.data.message);
                                } else {
                                  setError("An error occurred. Please try again.");
                                }
                              });
                    }} className="w-full px-5 py-2.5 m2-2 mb-2 hover:bg-green-600 border rounded-lg border-slate-200 text-center text-white bg-green-500 focus:outline-none font-medium text-sm">
                        Send Money
                    </button>
                </div>
            </div>

    </div>
}