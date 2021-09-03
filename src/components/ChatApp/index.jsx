import React from 'react';
import Messages from './Messages';
import Navigation from './Messages/Navigation';
import AddFriend from './AddFriend';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AddFriendBox from './AddFriendBox';
export default function ChatApp() {
    const match = useRouteMatch();
    return (
        <div className="app">
            <Navigation />
            <Switch>
                <Route exact path={`${match.url}/messages`} component={Messages} />
                <Route path={`${match.url}/addfriend`} component={AddFriend} />
            </Switch>
            <AddFriendBox />

        </div>
    )
}
