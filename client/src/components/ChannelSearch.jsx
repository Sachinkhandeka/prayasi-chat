import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { BsSearchHeart } from "react-icons/bs";
import { TextInput } from  "flowbite-react";

export default function ChannelSearch() {
    const [ query , setQuery ] = useState('');
    const [  loading , setLoading ] = useState(false);

    // get groups handler
    const getChannels = async(query)=> {
        try {
            // fetch channels
        } catch(err) {
            setQuery('');
        }
    }

    //search for groups or channels - input handler
    const onSearch = (e)=> {
        e.preventDefault();

        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    }
    return(
        <div className="relative flex items-center justify-center pt-4" >
                <TextInput 
                    placeholder="Search" 
                    type="text" value={query} 
                    onChange={onSearch}
                    rightIcon={BsSearchHeart} 
                />
        </div>
    );
}