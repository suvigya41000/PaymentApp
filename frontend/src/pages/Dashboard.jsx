import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";

export default function Dashboard(){ 
    const[balance,setBalance]=useState(0)
    const[initial,setInitial]=useState("")
    const[userName,setUserName]=useState("") 
        useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/details",{
            
            headers:{
                authorization:"Bearer "+localStorage.getItem("token")
            }
        
        }).then(response=>{ 
        setInitial(response.data.firstName[0])
        setUserName(response.data.userName)
        })
        },[])

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            
                headers:{
                    authorization:"Bearer "+localStorage.getItem("token")
                }
            
        }).then(response=>{
            setBalance(response.data.balance)
        })
    },[])
    return <div className="m-2 pt-2">
        <AppBar initial={initial}/>
        <div className="m-6">
        <Balance value={balance}/>
        <Users userName={userName}/>
        </div>
        
    </div>
}