import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelList, ChannelHeader, MessageList, MessageInput, Thread, ChannelSearch } from "stream-chat-react";
import Cookies from "universal-cookie";
import Auth from "./components/Auth";
import { useEffect } from "react";

import 'stream-chat-react/dist/css/v2/index.css';

const cookies = new Cookies();

const apiKey = 'sh4p4y7zy97n';
const authToken = cookies.get('token');
const client = StreamChat.getInstance(apiKey);



export default function App() {

  useEffect(() => {
    if (authToken) {
      client.connectUser({
        id: cookies.get("userId"),
        name: cookies.get("username"),
        fullName: cookies.get("fullName"),
        image: cookies.get("avatar"),
        mobileNumber: cookies.get("mobileNumber"),
      }, authToken);
    }
  }, [authToken, client, cookies]);

  if (!authToken) {
    return (
      <Auth />
    );
  }

  return (
    <>
    <Chat client={client}>
      <ChannelList />
      <Channel>
        <div className="flex flex-col gap-4 w-full relative" >
          <MessageList />
          <MessageInput />
        </div>
        <Thread />
      </Channel>
    </Chat>
    </>
  );
}

