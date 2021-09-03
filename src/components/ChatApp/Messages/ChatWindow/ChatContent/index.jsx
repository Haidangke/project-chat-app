/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../../../firebase/config';
import convertNameToAvatar from '../../../../../functions/convertNameToAvatar';
import getLastMessage from '../../../../../functions/getLastMessage';
import './ChatContent.scss';

export default function ChatContent() {
    const { id } = useSelector(state => state.user);
    const currentLF = useSelector(state => state.currentListFriend);
    const { name } = useSelector(state => state.currentFriend);
    
    
    const [listMessage, setListMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lengthListMessage, setLengthListMessage] = useState(50);
    const [lastMessage, setLastMessage] = useState({});

    
    
    
    useEffect( async () => {
        
            const unsbscribe = await db.collection("messages").orderBy("createdAt").where("idListFriend", "==", currentLF).onSnapshot( async (querySnapShot) => {
                const data = querySnapShot.docs.map((item) => ({id: item.id, ...item.data()}));


                const lengthData = data.length;
                const lastMessageData = getLastMessage(data, id);
                setLastMessage(lastMessageData);
                
                const convertData = [...data];
                let sliceDataHandled;
                if (data.length > 50 && lengthListMessage < lengthData) {
                    sliceDataHandled = convertData.slice(lengthData - lengthListMessage, lengthData);
                } else {
                    sliceDataHandled = data;
                }
    
                const messages = [...sliceDataHandled];
                const lengthListMessenges = sliceDataHandled.length;
    
                for (let i = 0; i < lengthListMessenges; i++) {
                    messages[i] = {
                        ...messages[i],
                        user: messages[i]?.idUser === id ? true : false
                    };
    
                    if (i > 0 && i < lengthListMessenges - 1) {
                        if (messages[i]?.idUser === messages[i + 1]?.idUser) {
                            messages[i] = {
                                ...messages[i],
                                position: (messages[i]?.idUser === messages[i - 1]?.idUser) ? 'center' : 'first'
                            };
                        }
    
    
                        if (messages[i]?.idUser !== messages[i + 1]?.idUser) {
                            messages[i] = {
                                ...messages[i],
                                position: (messages[i]?.idUser === messages[i - 1]?.idUser) ? 'last' : 'alone'
                            };
                        }
                    }
    
                    if (i === 0) {
                        messages[i] = {
                            ...messages[i],
                            position: (messages[i]?.idUser === messages[i + 1]?.idUser) ? 'first' : 'alone'
                        };
                    }
    
                    if (i === lengthListMessenges - 1) {
                        messages[i] = {
                            ...messages[i],
                            position: (messages[i]?.idUser === messages[i - 1]?.idUser) ? 'last' : 'alone'
                        };
    
                    }
                }
    
                const messageHandled = [...messages].reverse();
                setListMessage(messageHandled);
                setIsLoading(false);
            });
        
        

        return unsbscribe;
    }, [currentLF]);




    const [max, setMax] = useState(-1200)
    const onScroll = (e) => {

        const currentScrollY = e.target.scrollTop;
        if (currentScrollY < max) {
            setLengthListMessage(lengthListMessage + 50);
            setMax(max => max - 1200);
        }

    };

    return (
        <div className="chat-content ">
            <div className="chat-container">
                <div className="chat-container__message">
                    <div onScroll={onScroll} className="message_list" >
                        {listMessage.length > 0 ? listMessage.map((item, index) => (
                            <div key={index} style={{minHeight: `${item.id === lastMessage?.id ? '60px' : 'auto'}`}} className={`message-items message-items--${item.user ? 'me' : 'friend'} ${((item.position === 'last' || item.position === 'alone') && !item.user) ? 'message-items--last' : ''}`}>
                                <div style={{position: "relative", height: "37px"}} className={`message-item message-item--${item.position !== 'alone' ? `${item.position}` : ''}`}>{item.content}</div>
                                <div className="message-item__avatar">
                                    <p className="avatar" style={{ backgroundColor: "#046564" }} >{convertNameToAvatar(name)}</p>
                                </div>
                            </div>
                        )) :  <>{!isLoading ? <div className="message_list-start">Đây là lần đầu hai bạn trò chuyện</div>: ''}</>}
                    </div>

                </div>

            </div>

        </div>
    )
}
