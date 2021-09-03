/* eslint-disable react-hooks/exhaustive-deps */
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ellipsis } from 'react-spinners-css';
import { db } from "../../../../../firebase/config";
import guidGenerator from "../../../../../firebase/guidGenarator";
import convertNameToAvatar from '../../../../../functions/convertNameToAvatar';

export default function FriendRequest() {

    const user = useSelector((state) => state.user);
    const idUser = user.id;
    const nameUser = user.name;
    const avatarUser = user.avatar;

    const [listAddFriend, setListAddFriend] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    useEffect( () => {
        async function fetApi() {
            db.collection("listaddfriend").where("idReceiver", "==", idUser).onSnapshot((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }));
                setListAddFriend(data);
                setIsLoading(false);
            });
        }
        fetApi();
    }, [idUser]);

    const deleteItemAddFriend = async (idItemAddFriend) => {
        await db.collection("listaddfriend").doc(idItemAddFriend).delete();
    };

    useEffect(() => {
        return () => deleteItemAddFriend();
    }, [])

    const handleAgreeAddFriend = (
        idSender,
        nameSender,
        avatarSender,
        idItemAddFriend
    ) => {
        const randomId = guidGenerator();
        db.collection("listfriends")
            .doc(randomId)
            .set({
                members: [
                    {
                        name: nameUser,
                        id: idUser,
                        avatar: avatarUser,
                    },
                    {
                        name: nameSender,
                        id: idSender,
                        avatar: avatarSender,
                    },
                ],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        db.collection("lastMessage").doc(randomId).set({
            id: "",
            content: "Các bạn hiện đã được kết nối với nhau",
            idListFriend: randomId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        deleteItemAddFriend(idItemAddFriend);
    };

    const handleDenyAddFriend = (idItemAddFriend) => {
        deleteItemAddFriend(idItemAddFriend);
    };

    return (
        <div className="chat-content chat-content--friend-request">
            
            {!isLoading ? <>{!isLoading && listAddFriend.length === 0 ? (
                <div className="friend-request__start">
                    <div className="friend-request__start-image">
                        <img
                            src="https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg"
                            alt=""
                        />
                    </div>

                    <div className="friend-request__start-describe">
                        Bạn chưa có lời mời kết bạn nào
                    </div>

                </div>
            ) : (
                <div className="friend-request">
                    <div style={{ display: `${!isLoading ? 'block' : 'none'}  ` }} className="friend-request__title">
                        Lời mời kết bạn({listAddFriend.length})
                    </div>
                    <div className="friend-request__list">
                        {listAddFriend.map((item) => (
                            <div key={item.data.idSender} className="friend-request__item">
                                <div className="friend-request__item-avatar">
                                    <p className="avatar">{convertNameToAvatar(item.data.nameSender)}</p>
                                </div>
                                <div className="friend-request__item-name">
                                    {item.data.nameSender}
                                </div>
                                <div className="friend-request__item-button">
                                    <div
                                        onClick={() => handleDenyAddFriend(item.id)}
                                        className="friend-request__item-button-cancel"
                                    >
                                        Bỏ qua
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleAgreeAddFriend(
                                                item.data.idSender,
                                                item.data.nameSender,
                                                item.data.avatarSender,
                                                item.id
                                            )
                                        }
                                        className="friend-request__item-button-agree"
                                    >
                                        <i className="ti-check"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}</> :  <div className="list-friend__loading"><Ellipsis color="#C9CCD1" size={40} /></div>}
        </div>
    );
}
