import axios from "axios";
import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar";

export const Profile=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [id,setID]=useState("")
    const [initial,setInitial]=useState("");
    useEffect(()=>{ 
        axios.get("http://localhost:3000/api/v1/user/details",{
            
            headers:{
                authorization:"Bearer "+localStorage.getItem("token")
            }
        
    }).then(response=>{
        setFirstName(response.data.firstName)
        setUserName(response.data.userName)
        setLastName(response.data.lastName)
        setInitial(response.data.firstName[0])
        setID(response.data.id)
    })
    },[])
    return <div className="m-2 ">
        <AppBar initial={initial}></AppBar> 
        <div className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-200 w-max h-max mt-6 border border-slate-300" >
            <div className="flex flex-col-2 "> 
                <div className="pr-2 text-lg ">First Name:</div>
                <div className="pr-2 text-lg ">{firstName}</div>
            </div>
            <div className="flex">
                <div className="pr-2 text-lg ">Last Name: </div>
                <div className="pr-2 text-lg ">{lastName}</div>
            </div>
            <div className="flex">
                <div className="pr-2 text-lg ">Username: </div>
                <div className="pr-2 text-lg ">{userName}</div>
            </div>
            <div className="flex">
                <div className="pr-2 text-lg ">User Id: </div>
                <div className="pr-2 text-lg ">{id}</div>
            </div>
        </div>
        
    </div>
}