import React from 'react';
import './StartChatWindow.scss'

export default function StartChatWindow() {
    return (
        <div className="start-chat">
            <div className="start-chat__title">
                Chào mừng đến với ứng dụng nhắn tin của <p className="start-chat__title-author">Haidangke</p>
            </div>
            
            <div className="start-chat__describe">
                Kết nối bạn bè, dữ liệu thời gian thực, hiển thị và lưu trữ bảo mật
            </div>

            <div className="start-chat__image">
                <img src="https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg" alt="" />
            </div>

            
            
        </div>
    )
}
