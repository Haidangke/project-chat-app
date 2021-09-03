import './Login.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setUser } from '../../redux/slice/user';
import { db, auth } from '../../firebase/config';
import { Ripple } from 'react-spinners-css';


export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [isAccount, setIsAccount] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClickEmail, setIsClickEmail] = useState(false);
    const [isClickPassword, setIsClickPassword] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();


    

    const handleSubmit = async () => {
        setIsLoading(true);

        
        auth.signInWithEmailAndPassword(email, password)
        .then( async (user) => {
            const uid = user.user.uid;
                await db.collection('status').doc(uid).set({     
                    status: 'online'
                })
                await db.collection('users').where('email', '==', email).get()
                .then((querySnapshot) => {
                    const [data] = querySnapshot.docs.map(doc => doc.data());
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('avatar', data.avatar);
                    localStorage.setItem('id', uid);
                    const dataUser = {...data, id: uid};
                    const action = setUser(dataUser);
                    dispatch(action);
                    history.push('/home/messages');
                    setIsLoading(false);
                    setEmail('');
                    setPassword('');
                    
                })
                })
        .catch(error => {
            setError(error.message);
            setIsAccount(true);
            setIsLoading(false);
        })


    }

    useEffect(() => {
        return () => handleSubmit()
    }, [])


    const handleOnChangeEmail = (e) => {
        setIsAccount(false);
        setEmail(e.target.value);
    }

    const handleOnChangePassword = (e) => {
        setIsAccount(false);
        setPassword(e.target.value)
    }

    const handleToRegister = () => {
        history.push('/register');
    }

    const isClickInputEmail = () => {
        setIsClickEmail(true);
    }

    const isBlurInputEmail = () => {
        setIsClickEmail(false);
    }

    const isClickInputPassword = () => {
        setIsClickPassword(true);
    }

    const isBlurInputPassword = () => {
        setIsClickPassword(false);
    }


    return (
        <div className="form">
            <div className="form-title">Đăng nhập</div>
            <div className="form-group">
                <div className="form-label">Email</div>
                <div className="form-input">
                    <input style={{borderBottom: `1px solid ${isClickEmail ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, .2)'}`}} onClick={isClickInputEmail} onBlur={isBlurInputEmail} value={email} onChange={handleOnChangeEmail} placeholder="VD: haidangke@gmail.com" type="text" />
                </div>

            </div>

            <div className="form-group">
                <div className="form-label">Mật khẩu</div>
                <div className="form-input">
                    <input style={{borderBottom: `1px solid ${isClickPassword ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, .2)'}`}} onClick={isClickInputPassword} onBlur={isBlurInputPassword} value={password} onChange={handleOnChangePassword} placeholder="Nhập mật khẩu" type="password" />
                </div>
            </div>

            <div style={{display: `${isAccount ? 'block' : 'none'}`}} className="form-danger">
                {error}
            </div>
            <button onClick={handleSubmit} className="form-submit" >
                {isLoading ? <Ripple size={30} color="#fff"/> : 'Đăng nhập'}
            </button>
            <div onClick={handleToRegister} className="button-register">Đăng kí</div>
        </div>
    )
}
