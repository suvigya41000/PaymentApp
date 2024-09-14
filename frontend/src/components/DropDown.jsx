import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Drop = ({initial}) => {
    const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown visibility
  };

  return (
    <div className="relative inline-block">
      <div className="flex flex-col item-center justify-center">
      <div
        onClick={toggleDropdown}
        className="flex flex-col items-center justify-center rounded-full w-10 h-10 bg-slate-200 hover:bg-slate-300 text-xl font-semibold cursor-pointer">
            {initial}
        
      </div>
      </div>
      
      {isOpen && (
        <div
          id="dropdown"
          className="absolute right-0 bg-white  rounded-lg shadow w-44 dark:bg-gray-700 mt-1"
        >
          <div
            className="py-2 text-sm text-gray-700 dark:text-gray-200 select-none"
            aria-labelledby="dropdownDefaultButton"
          >
            <div
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={()=>
                    navigate("/profile")
                }
              >
                Profile
              </div>
              <div
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={()=>
                    navigate("/dashboard")
                }
              >
                Dashboard
              </div>
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              onClick={()=>{
                navigate("/transactions")
              }}>
                Transactions
                </div> 
                <div className="mx-2 mt-2">
                  <hr className="w-full bg-slate-300 "></hr>
                </div>
                <div
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={()=>{
                  localStorage.removeItem("token")
                  navigate("/")
                }}
              >
                Sign out
              </div>

              
        </div>
        </div>
      )}
    </div>
  );
};
