import React from 'react';
import './ChatWindow.scss';
import FriendRequest from './FriendRequest';

export default function ChatWindow() {
    return (
        <div className="chat-window">
            <div>
                <div className="top-bar">
                    <div className="top-bar__addfriend">
                        <div className="top-bar__addfriend-name">Danh sách kết bạn</div>
                    </div>
                </div>

                <FriendRequest/>

            </div>
        </div>


    )
}
