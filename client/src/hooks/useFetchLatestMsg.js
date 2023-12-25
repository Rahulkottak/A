import { useContext, useEffect, useState } from 'react'
import {ChatContext} from '../context/ChatContext';
import { baseUrl, getRequest } from '../utils/services';


export const useFetchLatestMsg = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext)
    const [ latestMsg, setLatestMsg ] = useState(null);

    useEffect(() => {
        const getMsgs = async () => {
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`)
        
            if (response.error) {
                return console.log("Error getting messages...", error);
            }

            const lastMsg = response[response?.length - 1];
            setLatestMsg(lastMsg);
        
        }
        getMsgs();
    }, [newMessage, notifications])

    return { latestMsg };
}