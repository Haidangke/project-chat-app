import {createSlice} from '@reduxjs/toolkit';

const currentFriend = createSlice({
    name: 'currentFriend',
    initialState: {},
    reducers: {
        setCurrentFriend: (state, action) => {
            const newCurrentFriend = {...action.payload};
            return newCurrentFriend;
        }
    }
})

const { reducer, actions } = currentFriend;
export const { setCurrentFriend } = actions;
export default reducer;