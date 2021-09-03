import {createSlice} from '@reduxjs/toolkit';

const listIdFriend = createSlice({
    name: 'listIdFriend',
    initialState: [],
    reducers: {
        setListIdFriend: (state, action) => {
            return [...action.payload];
        }
    }
})

const { reducer, actions } = listIdFriend;
export const { setListIdFriend } = actions;
export default reducer;