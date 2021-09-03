import React from 'react';
import InfoUser from './InfoUser';
import SearchBar from './SearchBar';
import ListFriend from './ListFriend';


export default function Sidebar() {
    return (
        
        <div className="side-bar">
            <InfoUser/>
            <SearchBar/>
            <ListFriend/>
            
        </div>
    )
}
