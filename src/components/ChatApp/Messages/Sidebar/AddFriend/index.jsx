import React from 'react'

export default function AddFriend() {
    return (
        <div className="friend" >
            <div className="friend__avatar">
                <img src="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png" alt="logo"/>
            </div>
            <div className="friend__info">
                <div className="friend__info-name">Bùi Hạnh Nguyên</div>
                <div className="friend__first-message">
                    You are now connected on Messenger
                </div>
            </div>
            <span className="friend__time">1 tuần</span>
            <div className="friend__button">
                <i className="ti-more-alt" />
            </div>
        </div>
    )
}
