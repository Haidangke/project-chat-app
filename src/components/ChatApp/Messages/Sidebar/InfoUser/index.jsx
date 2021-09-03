import React from 'react'
import { useSelector } from 'react-redux';
import convertNameToAvatar from '../../../../../functions/convertNameToAvatar';

export default function InfoUser() {
    const {name} = useSelector(state => state.user);
    
    
    return (
        <div className="info-user">
            <div className="info-user__avatar">
                <p className="avatar">{convertNameToAvatar(name)}</p>
            </div>
            <div className="info-name">{name}</div>
        </div>
    )
}
