import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import ChatApp from './components/ChatApp';
import Login from './components/Login';
import NoMatch from './components/NoMatch';
import Register from './components/Register';
function App() {
    const idSignIn = useSelector(state => state.user.id);
    return (
        <Switch>
            <Redirect exact from="/" to="/login" />
            {idSignIn ? <Route component={ChatApp} path="/home" /> : ''}

            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={NoMatch} />

        </Switch>
    );
}

export default App;
