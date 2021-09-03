import {createSlice} from '@reduxjs/toolkit';

const addFriend = createSlice({
    name: 'addFriend',
    initialState: false,
    reducers: {
        setActiveAddFriend: (state, action) => {
            return action.payload;
        }
    }
})

const { reducer, actions } = addFriend;
export const { setActiveAddFriend } = actions;
export default reducer;