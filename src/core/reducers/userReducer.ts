import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {
        nickname:'',
        email:'',
        uid:''
    },
	isLoading: false,
	error: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		registerUser: (state, action) => {
			state.isLoading = true;
		},

		registerUserSuccess: (state, action) => {
			state.isLoading = false;
            state.user.email=action.payload.email
            state.user.uid=action.payload.uid
		},

		registerUserFailid: (state, action) => {
			state.isLoading = false;
            state.error = action.payload.error
		},



		loginUser: (state, action) => {
			state.isLoading = true;
		},

		loginUserSuccess: (state, action) => {
			state.isLoading = false;
			state.user.email=action.payload.email
            state.user.uid=action.payload.uid
		},

		loginUserFailid: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		},
	},
});

export const {
	registerUser,
	registerUserSuccess,
	registerUserFailid,
	loginUser,
	loginUserSuccess,
	loginUserFailid,
} = userSlice.actions;

export default userSlice.reducer;
