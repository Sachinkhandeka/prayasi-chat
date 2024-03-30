import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelListContainer from "./components/ChannelListContainer";
import ChannelContainer from "./components/ChannelContainer";
import Auth from "./components/Auth";

const apiKey = 'nzg4gfbpxnjn';
const apiSecret = 'w32pe2g92w9n286b9haajffkw29k8hh6swksjkhj5pyfutmh3f6w6chqqa7aveny';
const authToken = false ; 
const client = StreamChat.getInstance(apiKey);

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