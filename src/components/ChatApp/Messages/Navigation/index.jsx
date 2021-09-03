import React, { useEffect } from 'react';
import { FiMessageCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { db } from '../../../../firebase/config';
import { setUser } from '../../../../redux/slice/user';
// import {setUser} from '../../../../redux/actions/user';
import "./Navigation.scss";

export default function Navigation() {
    const { id } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleMessage = () => {
        history.push('/home/messages');
    }

    const handleAddFriend = () => {
        history.push('/home/addfriend');
    }

    const handleLogOut = async () => {
        await db.collection('status').doc(id).set({
            status: 'offline'
        })

        const user = {
            name: '',
            avatar: '',
            id: ''
        }
        localStorage.clear();
        const action = setUser(user);
        dispatch(action);
        history.push('/login');
    }

    const handleLogOutCloseTab = async () => {
        
        await db.collection('status').doc(id).set({
            status: 'offline'
        })
    }

    useEffect(() => {
        db.collection('status').doc(id).set({
            status: 'online'
        })
    }, [id])

    useEffect(() => {
        window.addEventListener('beforeunload', handleLogOutCloseTab);
        return () => {
            window.removeEventListener('beforeunload', handleLogOutCloseTab)
        }
    })

    useEffect(() => {
        return () => handleLogOut()
    }, [])

    return (
        <div className="navigation">
            <div className="navigation-brand">
                <FiMessageCircle size={33} color="rgb(192 238 207)" />
            </div>

            <div onClick={handleMessage} className={`navigation-item ${history.location.pathname === '/home/messages' ? 'navigation-item--active' : ''} `}>
                <i className="ti-comment-alt"></i>
            </div>

            <div onClick={handleAddFriend} className={`navigation-item ${history.location.pathname === '/home/addfriend' ? 'navigation-item--active' : ''} `}>
                <i className="ti-user"></i>
            </div>

            <div className="navigation-item">
                <i className="ti-star"></i>
            </div>

            <div style={{ marginTop: 'calc(100vh - 390px)' }} className="navigation-item">
                <i className="ti-pencil"></i>
            </div>

            <div className="navigation-item">
                <i className="ti-settings"></i>
            </div>
            <div onClick={handleLogOut} className="navigation-item">
                <i className="ti-power-off"></i>
            </div>

        </div>
    )
}
