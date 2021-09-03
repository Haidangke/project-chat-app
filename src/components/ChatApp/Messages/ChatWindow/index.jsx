import React from 'react';
import { useSelector } from 'react-redux';
import ChatContent from './ChatContent';
import ChatInput from './ChatInput';
import TopBar from './TopBar';
import StartChatWindow from './StartChatWindow';

export default function ChatWindow() {
    const currentLF = useSelector(state => state.currentListFriend);
    return (
        <>
            {(currentLF) ? <div className="chat-window">
                <TopBar />
                <ChatContent />
                <ChatInput />
            </div> : <StartChatWindow />}
        </>


    )
}
