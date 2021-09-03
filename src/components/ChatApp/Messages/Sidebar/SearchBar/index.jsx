import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setSearchFriend } from '../../../../../redux/slice/searchFriend';
// import { setSearchFriend } from '../../../../../redux/actions/searchFriend';
export default function SearchBar() {
    const dispatch = useDispatch();
    const [isClose, setIsClose] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [valueSearchAction, setValueSearchAction] = useState('');

    const onChangeSearchFriend = (e) => {
        setIsClose(true);
        
        let value = e.target.value;
        let valueAction = e.target.value.toLowerCase().trim();
        valueAction = valueAction.replace(/ +/g, "");
        setValueSearch(value);
        setValueSearchAction(valueAction);
    }
    const handleCloseSearch = () => {
        setIsClose(false);
        setValueSearch('');
        setValueSearchAction('');
    }

    useEffect(() => {
        const action = setSearchFriend(valueSearchAction);
        dispatch(action);
    }, [valueSearch])

    return (
        <div className="search-bar">
            <input value={valueSearch} onChange={onChangeSearchFriend} type="text" placeholder="Search chat" />
            <div style={{ display: `${isClose ? 'block' : 'none'}` }} onClick={handleCloseSearch} className="icon-close">
                <i className="ti-close" />
            </div>
        </div>
    );
}
