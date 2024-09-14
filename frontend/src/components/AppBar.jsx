import { Drop } from "./DropDown"

export const AppBar=({initial})=>{
    return <div className="shadow-md h-12 flex justify-between mx-2 bg-white py-1">
        <div className="flex flex-col justify-center h-full ml-4 font-bold text-blue-700 cursor-default ">PayTm App</div>
        <div className="flex justify-center mr-2">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        {localStorage.getItem("token") && <Drop initial={initial}/>} 
        </div>
    </div>
}