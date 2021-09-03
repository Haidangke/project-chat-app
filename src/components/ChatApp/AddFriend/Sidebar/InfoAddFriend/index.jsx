import React from 'react'; import { useDispatch } from 'react-redux';
import { setActiveAddFriend } from '../../../../../redux/slice/addFriend';
// import { setActiveAddFriend } from '../../../../../redux/actions/activeAddFriend';

export default function InfoAddFriend() {
    const dispatch = useDispatch();
    const activeAddFriend = () => {
        const action = setActiveAddFriend(true);
        dispatch(action);
    }
    return (
        <div className="info-add-friend">
            <div className="info-add-friend__title">
                <p>Friends</p>
            </div>
            <div onClick={activeAddFriend} className="info-add-friend__add">
                <i className="ti-plus"></i> Add Friends
            </div>
        </div>
    )
}
