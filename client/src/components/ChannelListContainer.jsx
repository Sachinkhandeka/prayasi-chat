import Cookies from "universal-cookie";
import { BsChatRightHeart } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";

import ChannelSearch from "./ChannelSearch";
const Sidebar = () => (
    <div className="bg-blue-500 w-20 min-h-screen">
      <div className="p-4 w-full mx-auto">
        <div className="bg-white rounded-full h-14 w-14 text-center flex items-center justify-center">
          <BsChatRightHeart size={26} color="red" />
        </div>
      </div>
      <div className="p-4 w-full mx-auto">
        <div
          className="bg-white rounded-full h-14 w-14 text-center flex items-center justify-center cursor-pointer"
          
        >
          <IoMdLogOut size={26} />
        </div>
      </div>
    </div>
  );
  
  const Brand = () => (
    <div className="p-4">
      <p className="text-white text-lg font-mono font-semibold">Prayasi Chat</p>
    </div>
  );

export default function ChannelListContainer() {
  

  return (
    <>
    
    </>
  );
}
