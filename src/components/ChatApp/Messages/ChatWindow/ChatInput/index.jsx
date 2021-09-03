import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../../../../firebase/config';
import firebase from 'firebase';

export default function ChatInput() {
    const [message, setMessage] = useState('');
    const currentLF = useSelector(state => state.currentListFriend);
    const currentFriend = useSelector(state => state.currentFriend);
    const statusCurrentFriend = currentFriend.status;
    const { id, name } = useSelector(state => state.user);
    const handleChangeInputMessage = (e) => {
        setMessage(e.target.value);
    }



    const handleAddMessage = async () => {
        if (!message) return;
        await db.collection('messages').add({
            content: message,
            idUser: id,
            name: name,
            idListFriend: currentLF,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

        await db.collection('lastMessage').doc(currentLF).set({
            content: message,
            idListFriend: currentLF,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            id: id,
        })
        setMessage('');
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            handleAddMessage();
        }
    }
    return (
        <div className="chat-input-box">
            <div className="chat-input">
                <input onKeyDown={handleKeyPress} value={message} onChange={handleChangeInputMessage} type="text" placeholder="Aa" />
                <div onClick={handleAddMessage} className="chat-input__submit" >
                    <i style={{ color: '#fff' }} className="fas fa-paper-plane"></i>
                </div>
            </div>
        </div>
    )
}
