import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(channelId => channelId === action.payload)
                    ,
                    1
                )
            } else {
                state.currentUser.subscribedUsers.push(action.payload)
            }
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions

export default userSlice.reducer
