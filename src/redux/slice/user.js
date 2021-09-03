import {createSlice} from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        name: localStorage.name,
        avatar: localStorage.avatar,
        id: localStorage.id
    },
    reducers: {
        setUser: (state, action) => {
            return {...action.payload};
        }
    }
})

const { reducer, actions } = user;
export const {setUser} = actions;
export default reducer;