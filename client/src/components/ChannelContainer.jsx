import { Channel, useChatContext, MessageList, MessageInput } from "stream-chat-react";

import CreateChannel from "./CreateChannel";
import EditChannel from "./EditChannel";
import { useState } from "react";


export default function ChannelContainer({ isCreating , setIsCreating , isEditing, setIsEditing, createType, setCreateType }){
    const { channel } = useChatContext();

    if(isCreating) {
        return(
            <div>
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }
    if(isEditing) {
        return(
            <div>
                <EditChannel setIsEditing={createType} />
            </div>
        )
    }

    const emptyState = ()=> (
        <div>
            <p>This is the begining of your chat history.</p>
            <p>Send messages , attachments , links , emojis and more!</p>
        </div>
    )

    return (
        <div>
            <Channel 
                EmptyStateIndicator={emptyState} 
                Message={(messageProps , i)=> <MessageList key={i} { ...messageProps } />} 
                setIsEditing={setIsEditing} 
            >
                <MessageInput/>
            </Channel>
        </div>
    )
}