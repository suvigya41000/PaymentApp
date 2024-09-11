import { Drop } from "./DropDown"

export const AppBar=({initial})=>{
    return <div className="shadow-md h-12 flex justify-between mt-2 mx-2">
        <div className="flex flex-col justify-center h-full ml-4 ">PayTm App</div>
        <div className="flex justify-center mr-2">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
            <Drop initial={initial}/>
        </div>
    </div>
}