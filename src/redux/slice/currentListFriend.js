import {createSlice} from '@reduxjs/toolkit';

const currentListFriend = createSlice({
    name: 'currentListFriend',
    initialState: '',
    reducers: {
        setCurrentListFriend: (state, action) => {
            return action.payload;
        }
    }
})

const { reducer, actions } = currentListFriend;
export const { setCurrentListFriend } = actions;
export default reducer;