/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ellipsis } from 'react-spinners-css';
import { db } from '../../../../../firebase/config';
import convertNameToAvatar from '../../../../../functions/convertNameToAvatar';
import convertString from '../../../../../functions/convertString';
import formatDate from '../../../../../functions/formatDate';

import { setCurrentFriend } from '../../../../../redux/slice/currentFriend';
import { setCurrentListFriend } from '../../../../../redux/slice/currentListFriend';
import { setListIdFriend } from '../../../../../redux/slice/listIdFriend';



export default function ListFriend() {
    const dispatch = useDispatch();

    const currentFriend = useSelector((state) => state.currentFriend);
    const user = useSelector(state => state.user);
    const { id, name, avatar } = user;
    const searchFriend = useSelector(state => state.searchFriend);

    const [listLastMessage, setListLastMessage] = useState([]);
    const [listFriendTemp, setListFriendTemp] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
            if (!id || !name || !avatar) return;
            const unsubcribe = db.collection('listfriends').where('members', 'array-contains', { id, name, avatar }).onSnapshot(async querySnapshot => {
                const arrayListFriend = querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }));

                if (arrayListFriend.length <= 0) {
                    setIsLoading(false);
                    return;
                }

                const arrayFriend = arrayListFriend.map(friends => ({
                    data: friends.data.members.filter(friend => friend.id !== id)[0],
                    id: friends.id
                }))


                const listFriendId = arrayFriend.map(item => item.data.id);
                const actionListFriend = setListIdFriend(listFriendId);
                dispatch(actionListFriend);

                if (arrayFriend.length <= 0) return;
                


                const listIdFriend = arrayFriend.map(item => item.id);
                db.collection('lastMessage').orderBy('createdAt').where('idListFriend', 'in', listIdFriend).onSnapshot( async querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    db.collection('status').onSnapshot(querySnapshot => {
                        
                        const newData = [...data];
                        const listLastMessageData = [];
                        const statusData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                        if (newData.length <= 0 || statusData.length <= 0) return;
                        for (let i = 0; i < newData.length; i++) {
                            for (let j = 0; j < arrayFriend.length; j++) {
                                if (newData[i].idListFriend === arrayFriend[j].id) {
                                    listLastMessageData[i] = {
                                        data: { ...arrayFriend[j].data },
                                        id: arrayFriend[j].id,
                                        lastMessage: `${newData[i].id === id ? 'You: ' : ''} ${newData[i].content}`,
                                        createdAt: formatDate(newData[i].createdAt?.seconds),
                                        status: statusData.filter(item => item.id === arrayFriend[j].data.id)[0].status
                                    }
                                }
                            }
                        }

                        setListLastMessage(listLastMessageData.reverse());
                        setListFriendTemp(listLastMessageData);
                        setIsLoading(false);

                    })
                })

            })
        
        return unsubcribe;
    }, [id])



    const getIdListFriend = (idListF, nameFriend, avatarFriend, idFriend, status) => {


        if (currentFriend.id === idFriend) return;

        const actionCurLF = setCurrentListFriend(idListF);
        dispatch(actionCurLF);

        const actionCurFriend = setCurrentFriend({
            name: nameFriend,
            avatar: avatarFriend,
            id: idFriend,
            status: status
        });
        dispatch(actionCurFriend);

    }


    useEffect(() => {
        const newListMessage = [...listFriendTemp];
        const filterListMessage = newListMessage.filter(friend => {
            return convertString(friend.data.name).includes(searchFriend);
        })
        setListLastMessage(filterListMessage);

    }, [searchFriend])



    const listLastMessageLength = listFriendTemp.length;
    return (
        <div className="list-friend">
            {listLastMessageLength > 0 || !isLoading ? <div>{listLastMessage.map(friend => (
                <div key={friend.id} onClick={() => getIdListFriend(friend.id, friend.data.name, friend.data.avatar, friend.data.id, friend.status)} className={`friend ${friend.data.id === currentFriend.id ? 'friend--active' : ''} `} >
                    <div className="friend__avatar">
                        <div className="avatar" style={{ backgroundColor: "#046564" }}>{convertNameToAvatar(friend.data.name)}
                            <div style={{ opacity: friend.status === 'online' ? 1 : 0 }} className="friend-status">
                            </div>
                        </div>
                    </div>
                    <div className="friend__info">
                        <div className="friend__info-name">{friend.data.name}</div>
                        <div className="friend__first-message">
                            {friend?.lastMessage}
                        </div>
                    </div>
                    <span className="friend__time">{friend?.createdAt}</span>

                </div>
            ))}</div> : <div className="list-friend__loading"><Ellipsis color="#C9CCD1" size={40} /></div>}
            <div className="list-friend__no-friend" style={{ display: `${listLastMessageLength === 0 ? 'block' : 'none'}` }}>Kết bạn với mọi người để trò chuyện cùng nhau</div>

        </div>
    )
}
