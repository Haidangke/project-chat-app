/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Ripple } from 'react-spinners-css';
import { auth, db } from '../../firebase/config';


export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConFirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();
    const avatarTemp = 'true';
    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState('');


    const handleSubmit = useCallback(async () => {
        if(password !== passwordConFirm) {
            setMessageError('Re-entered password is not correct');
            setIsError(true)
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            const id = user.user.uid;
            db.collection('users').doc(id).set({
                name: name,
                email: email,
                avatar:  avatarTemp,
                password: password,
            })
            db.collection('status').doc(id).set({
                status: 'offline'
            })
            history.push('/login');
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
            setMessageError(error.message);
            setIsError(true);
            setIsLoading(false);
        })
        
    })

    useEffect(() => {
        return () => handleSubmit();
    }, [])

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleOnChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    }


    const handleOnChangeName = (e) => {
        setName(e.target.value);
    }

    const handleToLogin = () => {
        history.push('/login')
    }

    // const onChange = (e) => {
    //     var reader = new FileReader();
    //     let file = e.target.files[0];
    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     }
       
    //     reader.readAsDataURL(file);
    // }

    return (
        <div className="form">
            <div className="form-title">Mời bạn đăng kí !!</div>
            <div className="form-group">
                <div className="form-label">Email</div>
                <div className="form-input">
                    <input value={email} onChange={handleOnChangeEmail} placeholder="VD: haidangke@gmail.com" type="text" />
                </div>

            </div>

            <div className="form-group">
                <div className="form-label">Tên người dùng</div>
                <div className="form-input">
                    <input value={name} onChange={handleOnChangeName} placeholder="Nhập tên của bạn" type="text" />
                </div>
            </div>

            <div className="form-group">
                <div className="form-label">Mật khẩu</div>
                <div className="form-input">
                    <input value={password} onChange={handleOnChangePassword} placeholder="Nhập mật khẩu" type="password" />
                </div>
            </div>

            <div className="form-group">
                <div className="form-label">Nhập lại mật khẩu</div>
                <div className="form-input">
                    <input value={passwordConFirm} onChange={handleOnChangePasswordConfirm} placeholder="Nhập lại mật khẩu" type="password" />
                </div>
            </div>

            <div style={{display: `${isError ? 'block' : 'none'}`}} className="form-danger">
                {messageError}
            </div>
            <button onClick={handleSubmit} className="form-submit" >{isLoading ? <Ripple size={30} color="#fff"/> : 'Đăng kí'}</button>
            <div onClick={handleToLogin} className="button-register">Đăng nhập</div>
        </div>
    )
}
