import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { BsChatRightHeart } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";

import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";

const Sidebar = ( { logout })=> (
    <div className="bg-blue-500 w-20 min-h-screen" >
        <div className="p-4 w-full mx-auto" >
            <div className="bg-white rounded-full h-14 w-14 text-center flex items-center justify-center" >
                <BsChatRightHeart size={26} color="red"/>
            </div>
        </div>
        <div className="p-4 w-full mx-auto" >
            <div className="bg-white rounded-full h-14 w-14 text-center flex items-center justify-center" >
                <IoMdLogOut size={26} onClick={logout} className="cursor-pointer" />
            </div>
        </div>
    </div>
);

const Brand = ()=> (
    <div className="p-4" >
        <p className="text-white text-lg font-mono font-semibold" >Prayasi Chat</p>
    </div>
)

export default function ChannelListContainer() {
    const cookies = new Cookies();
    const  logout =  ()=> {
        cookies.remove("token");
        cookies.remove('username');
        cookies.remove("fullName");
        cookies.remove("userId");
        cookies.remove("avatar");

        window.location.reload();
    }
    return (
        <>
          <Sidebar logout={logout} />
          <div className="flex flex-col w-[240px] bg-blue-400" >
            <Brand />
            <ChannelSearch />
            <ChannelList 
               filters={{}}
               channelRenderFilterFn={()=> {}}
               List={(listProps)=> (
                <TeamChannelList  { ...listProps } type={"team"} />
               )}
               Preview={(previewProps)=> (
                <TeamChannelPreview { ...previewProps } type={"team"} />
               )}
            />
            <ChannelList 
               filters={{}}
               channelRenderFilterFn={()=> {}}
               List={(listProps)=> (
                <TeamChannelList  { ...listProps } type={"messaging"} />
               )}
               Preview={(previewProps)=> (
                <TeamChannelPreview { ...previewProps } type={"messaging"} />
               )}
            />
          </div>
        </>
    )
}