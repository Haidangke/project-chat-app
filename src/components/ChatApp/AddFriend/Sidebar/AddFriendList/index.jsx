import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../../../firebase/config';
import { Ellipsis } from 'react-spinners-css';

export default function AddFriendList() {
    const { id, name, avatar } = useSelector(state => state.user);
    const [listAddFriend, setListAddFriend] = useState([]);
    const [lengthListFirstChar, setLengthListFirstChar] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    useEffect( () => {
        if (!id) return;
        setIsLoading(true);
        async function fetchApi () {
            db.collection('listfriends').where('members', 'array-contains', { id, name, avatar }).onSnapshot(querySnapshot => {
                const arrayListFriend = querySnapshot.docs.map(doc => doc.data());
                const arrayFriend = arrayListFriend.map(friends => ({
                    data: friends.members.filter(friend => friend.id !== id)[0],
                })).map(friend => friend.data);
    
                const listFristCharName = arrayFriend.map(item => item.name[0]);
                const newListFristCharName = listFristCharName.sort((a, b) => a.localeCompare(b));
                const listFristCharNameConvert = Array.from(new Set(newListFristCharName));
    
                const listFirstCharFinish = [];
                listFristCharNameConvert.forEach(x => {
                    listFirstCharFinish.push({
                        title: x,
                        data: arrayFriend.filter(item => item.name[0] === x)
                    })
                })
                setListAddFriend(listFirstCharFinish);
                setLengthListFirstChar(listFirstCharFinish.length);
                setIsLoading(false);
    
            })
        }
        


        fetchApi();
    }, [id, name, avatar])
    return (
        <>{!isLoading ? <>
            <div className="search-bar">
                <input type="text" placeholder="Search users" />
                <div className="icon-close">
                    <i className="ti-close" />
                </div>
            </div>
            <div className="addfriend-list">
                {lengthListFirstChar > 0 ? <>{listAddFriend.map((item, index) => (
                    <div key={index} className="addfriend-item">
                        <div className="addfriend-item__title">
                            {item.title}
                        </div>
                        <div className="addfriend-item__list">
                            {item.data.map((data, indexData) => (
                                <div key={indexData} className="addfriend-item__item">
                                    {data.name}
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                            ))}
                        </div>
                    </div>
                )
                )}</> : <div className="list-friend__no-friend" style={{ padding: 0, overflow: "hidden" }} >Kết bạn với mọi người để trò chuyện cùng nhau</div>}
            </div>
        </> : <div className="list-friend__loading"><Ellipsis color="#C9CCD1" size={40} /></div>}</>
    )
}
