import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../../firebase/config';
import { Ellipsis } from 'react-spinners-css';
import { setActiveAddFriend } from '../../../redux/slice/addFriend';
// import { setActiveAddFriend } from '../../../redux/actions/activeAddFriend';
import convertNameToAvatar from '../../../functions/convertNameToAvatar';

export default function AddFriendBox() {
    const isActiveAddFriend = useSelector(state => state.isActiveAddFriend);
    const listIdFriend = useSelector(state => state.listFriend);
    const user = useSelector(state => state.user);
    const idUser = user.id;
    const nameUser = user.name;
    const avatarUser = user.avatar;
    const [friendSearch, setFriendSearch] = useState({});
    const [statusSearch, setStatusSearch] = useState('');
    const [statusColor, setStatusColor] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const dispatch = useDispatch();


    const handleHideAddFriendBox = () => {
        const action = setActiveAddFriend(false);
        dispatch(action);
        setSearchEmail('');
        setFriendSearch({});
        setIsSearch(false);
    }

    const handleSearchEmail = (e) => {
        setSearchEmail(e.target.value);
    }

    const handleSubmitSearchEmail = () => {
        setIsLoading(true);
        db.collection('users').where('email', '==', searchEmail).get()
        .then(querySnapshot => {

            const [data] = querySnapshot.docs.map(doc => (doc.data()));
            const [id] = querySnapshot.docs.map(doc => (doc.id));
            db.collection('listaddfriend').where('idSender', '==', idUser).get()
            .then(querySnapshot => {
                const data2 = querySnapshot.docs.map(doc => (doc.data()));
                db.collection('listaddfriend').where('idReceiver', '==', idUser).get()
                .then(querySnapshot => {
                    setIsLoading(false);
                    const data3 = querySnapshot.docs.map(doc => (doc.data()));
                    const listIdRequestForMe = data3.map(item => item.idSender);
                    setIsSearch(true);
                    if (data?.name) {
                        setFriendSearch({
                            name: data.name,
                            avatar: data.avatar,
                            id: id
                    })

                    if (id === idUser) {
                        setStatusSearch('Bản thân');
                        setStatusColor('black');
                    }

                    if (listIdFriend.includes(id)) {
                        setStatusSearch('Bạn bè');
                        setStatusColor('black');
                    }

                    if (!listIdFriend.includes(id) && id !== idUser) {
                        setStatusSearch('Thêm bạn');
                        setStatusColor('green');
                    }

                    if (data2.length > 0 && data2.filter(item => item.idReceiver === id).length > 0) {
                        setStatusSearch('Hủy yêu cầu');
                        setStatusColor('red');
                    }

                    if(listIdRequestForMe.includes(id)) {
                        setStatusSearch('Từ chối yêu cầu');
                        setStatusColor('red');
                    }
                    } else {
                        setFriendSearch({})
                    }
                })
                

            })
        })

    }

    const handleClickAddFriend = () => {
        console.log('Click')
        if (statusSearch === 'Thêm bạn') {
            db.collection('listaddfriend').add({
                idSender: idUser,
                avatarSender: avatarUser,
                nameSender: nameUser,
                idReceiver: friendSearch.id
            })
            const action = setActiveAddFriend(false);
            dispatch(action);
            handleHideAddFriendBox();
        }
    }



    return (
        <div style={{ display: `${isActiveAddFriend ? 'flex' : 'none'}` }} className="addfriend-box">
            <div className="table-addfriend">
                <div className="table-addfriend__topbar">
                    <div  className="table-addfriend__topbar-describe">Thêm bạn</div>
                    <div onClick={handleHideAddFriendBox} className="table-addfriend__topbar-close">
                        <i className="ti-close" />
                    </div>

                </div>
                <div className="table-addfriend__input">
                    <input value={searchEmail} onChange={handleSearchEmail} type="text" placeholder="Nhập email" />
                    <div onClick={handleSubmitSearchEmail} className="table-addfriend__icon-search">
                        <i className="ti-search"></i>
                    </div>
                </div>
                {!isLoading ? <div>{!isSearch ? <div className="table-addfriend__start">Không có tìm kiếm nào gần đây</div> : <div> {friendSearch?.name ? <div style={{ display: `${friendSearch?.name ? 'flex' : 'none'}` }} className="table-addfriend__infofriend">
                    <div className="table-addfriend__infofriend-avatar">
                        <p style={{backgroundColor: '#046564'}} className="avatar">{convertNameToAvatar(friendSearch.name)}</p>
                    </div>
                    <div className="table-addfriend__infofriend-name">
                        {friendSearch.name}
                    </div>
                    <div 
                        style={{cursor: `${statusSearch === 'Thêm bạn' ? 'pointer' : ''}`, color: statusColor}} 
                        onClick={handleClickAddFriend} className="table-addfriend__infofriend-add"
                    >
                        {statusSearch}
                    </div>
                </div> : <div className="table-addfriend__infofriend table-addfriend__infofriend-none">Không tìm thấy người dùng Email này !</div>}</div>}</div>: 
                <Ellipsis 
                    color="#47BB75" 
                    size={40} 
                    style={{
                        width: "360px", 
                        height: "100%", 
                        display: "flex", 
                        marginTop: "60px",
                        marginLeft: "160px"
                    }}
                />}


                <div className="table-addfriend__button">
                    <div onClick={handleHideAddFriendBox} className="table-addfriend__button-cancel">Hủy</div>
                    <div onClick={handleSubmitSearchEmail} className="table-addfriend__button-search">Tìm kiếm</div>
                </div>
            </div>
        </div>
    )
}
