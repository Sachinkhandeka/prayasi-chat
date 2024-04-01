import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelListContainer from "./components/ChannelListContainer";
import ChannelContainer from "./components/ChannelContainer";
import Auth from "./components/Auth";

const cookies  = new Cookies();

const apiKey = 'sh4p4y7zy97n';
const authToken = cookies.get('token'); 
const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
    id : cookies.get("userId"),
    name : cookies.get("username"),
    fullName : cookies.get("fullName"),
    image : cookies.get("avatar"),
    mobileNumber : cookies.get("mobileNumber"),
  }, authToken);
}


export default function App() {
  if(!authToken) {
    return (
      <Auth  />
    );
  }
  return (
   <>
   <div className="flex" >
    <Chat client={client} theme="team light" >
      <ChannelListContainer />
      <ChannelContainer  />
    </Chat>
   </div>
   </>
  );
}