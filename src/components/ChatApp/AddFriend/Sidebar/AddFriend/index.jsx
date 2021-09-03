import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveAddFriend } from '../../../../../redux/actions/activeAddFriend';

export default function AddFriend() {
    const dispatch = useDispatch();
    const activeAddFriend = () => {
        const action = setActiveAddFriend(true);
        dispatch(action);
    }
    return (
        <div className="addfriend" onClick={activeAddFriend}>
            <div className="addfriend-icon">
                <i className="fas fa-user-plus" />
            </div>
            <div className="addfriend-describe">
                Thêm bạn bằng Email
            </div>
        </div>
    )
}
