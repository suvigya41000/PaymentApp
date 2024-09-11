import { useEffect, useState } from "react"
import { Button } from "./Button";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export const Users=({userName})=>{
    const[users,setUsers]=useState([]);
    const[filter,setFilter]=useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then(response=>{
            setUsers(response.data.user)
        })
        
    },[filter])
    return <>
        <div className="text-lg font-bold mt-6">Users</div>
        <div className="my-2">
            <input type="text" placeholder="Search user..." className="border w-full px-2 py-2 rounded border-slate-300" onChange={e=>{
                setFilter(e.target.value)
            }}/>
        </div>
        <div>
            {users
          .filter((user) => user.userName !== userName) // Filter out the logged-in user
          .sort((a, b) => a.firstName.localeCompare(b.firstName)) // Sort by first name in alphabetical order
          .map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
    </>
}
function User({user}){
    const navigate=useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full flex-col h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-1 text-xl text-center hover:bg-slate-300">
                {user.firstName[0]}
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>{user.firstName} {user.lastName}</div>
            </div>
        </div>
        <div className="flex flex-col justify-center -full">
            <Button onClick={()=>{
                navigate('/send?id='+user._id + "&name="+user.firstName);
            }} lable={"Send Money"}/>
        </div>

    </div>
}