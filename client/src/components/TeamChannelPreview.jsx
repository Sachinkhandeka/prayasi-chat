import { Avatar, useChatContext } from "stream-chat-react"

export default  function TeamChannelPreview({ channel , type }) {
    const {  channel : activeChannel , client } = useChatContext();

    const ChannelPreview =  ()=> (
        <p>
            #{ channel?.data?.name || channel?.data?.id }
        </p>
    );


    const DirectPreview = ()=> {
        const members = Object.values(channel.states.members).filter(({ user })=> user.id !== client.id );

        return (
            <div>
                <Avatar 
                  image={members[0]?.user?.image}
                  name={members[0]?.user?.fullName}
                  size={24}
                />
                <p>{ members[0]?.user?.fullName }</p>
            </div>
        )
    }

    return (
        <div 
           className={`${ channel?.id ===activeChannel?.id ? 'bg-blue-600' : '' }`} 
           onClick={()=> {
            console.log(channel);
           }} >
            { type === 'team' ? 'ChannelPreview' : <DirectPreview /> }
           </div>
    )
}