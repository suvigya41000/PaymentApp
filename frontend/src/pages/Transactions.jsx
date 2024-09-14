import axios from "axios"
import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"

export const Transactions=()=>{
    const[transcs,setTranscs]=useState([])
    const[initial,setInitial]=useState("")
    useEffect(()=>{
      axios.get("http://localhost:3000/api/v1/user/details",{
          
          headers:{
              authorization:"Bearer "+localStorage.getItem("token")
          }
      
    }).then(response=>{ 
      setInitial(response.data.firstName[0])
    })
    },[])
    useEffect(()=>{ 
        axios.get("http://localhost:3000/api/v1/account/transactions",{
            
                headers:{
                    authorization:"Bearer "+localStorage.getItem("token")
                }
            
        }).then(response=>{
            setTranscs(response.data.transactions)
            console.log(transcs)
        })
    },[])
    
        return <div className="bg-slate-100 h-screen pt-4 ">
            <AppBar initial={initial}/> 
            <div className="flex flex-col text-4xl py-3 px-2 font-bold ">Transaction History</div>
            {transcs.map((transc)=>{
                return <div className="flex border border-slate-200 shadow-sm p-3 my-1 text-red-500 font-semibold bg-white mx-2 shadow-sm">
                    {transc}
                </div>
            })}
        </div>
    
}