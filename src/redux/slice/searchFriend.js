import {createSlice} from '@reduxjs/toolkit';

const searchFriend = createSlice({
    name: 'searchFriend',
    initialState: '',
    reducers: {
        setSearchFriend: (state, action) => {
            return action.payload;
        }
    }
})

const { reducer, actions } = searchFriend;
export const { setSearchFriend } = actions;
export default reducer;