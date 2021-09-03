// import { createStore } from 'redux';
// import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user';
import searchFriendReducer from './slice/searchFriend';
import listFriendReducer from './slice/listIdFriend';
import currentListFriendReducer from './slice/currentListFriend';
import currentFriendReducer from './slice/currentFriend';
import addFriendReducer from './slice/addFriend';

const rootReducer = {
    user: userReducer,
    seachFriend: searchFriendReducer,
    listFriend: listFriendReducer,
    currentFriend: currentFriendReducer,
    currentListFriend: currentListFriendReducer,
    isActiveAddFriend: addFriendReducer
}

// const store = createStore(rootReducer);
const store = configureStore({
    reducer: rootReducer
})

export default store;