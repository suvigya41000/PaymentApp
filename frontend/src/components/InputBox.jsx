export function InputBox({lable,placeHolder,onChange}){
    return (<div className="text-black text-sm font-medium text-left py-2 ">
        {lable}
        <input onChange={onChange} placeholder={placeHolder} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>)
}