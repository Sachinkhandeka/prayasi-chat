import { TbFaceIdError } from "react-icons/tb";

export default function TeamChannelList({ children, error = false , loading , type }) {
    if(error) {
        return type ===  'team' ? (
            <div className="p-4 text-white" >
                <p className="flex flex-col justify-center items-center">
                    <span><TbFaceIdError size={26} /></span> Connection error, please wait a moment and try again.
                </p>
            </div>
        ): null 
    }

    if(loading) {
        return(
            <div>
                <p>
                    { type === 'team' ? 'Channels': 'Messages' } loading ...
                </p>
            </div>
        )
    }
    return (
        <div>
            <div>
                <p>
                    { type === 'team' ? 'Channels': 'Direct Messages' }
                </p>
                {/* button -- add channel(group) */}
            </div>
            { children }
        </div>
    )
}