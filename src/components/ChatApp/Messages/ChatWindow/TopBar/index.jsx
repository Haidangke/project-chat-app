import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../../firebase/config';
import convertNameToAvatar from '../../../../../functions/convertNameToAvatar';
import { setCurrentFriend } from '../../../../../redux/slice/currentFriend';

export default function TopBar() {
    const dispatch = useDispatch();
    const { name, status, id, avatar } = useSelector(state => state.currentFriend);

    useEffect(() => {
        let unsubscribe;
        async function getStatusCurrentFriend() {
            unsubscribe = db.collection('status').doc(id).onSnapshot(querySnapShot => {
                console.log(querySnapShot.data().status)
                const status = querySnapShot.data().status;
                const actionCurFriend = setCurrentFriend({
                    name,
                    avatar,
                    id,
                    status: status
                });
                dispatch(actionCurFriend);
            })
        }
        getStatusCurrentFriend();
        return () => unsubscribe;
    }, [id])
    return (

        <div className="top-bar">
            <div className="top-bar__info">
                <div className="top-bar__info-avatar">
                    <p className="avatar" style={{backgroundColor: "#046564"}}>{convertNameToAvatar(name)}</p>
                </div>
                <div className="top-bar__info-text">
                    <div className="top-bar__info-name">{name}</div>
                    <div className="top-bar__info-status">{status}</div>
                </div>
                
            </div>
        </div>
    )
}
