import React from 'react';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';

export default function Messages() {
    return (
        <div className="messages" >
            <div className="messages-box">
                <Sidebar/>
                <ChatWindow/>
            </div>
        </div>
    )
}
