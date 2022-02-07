import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {
		nickname: '',
		email: '',
		uid: '',
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

		registerUserFailid: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		},

		loginUser: (state, action) => {
			state.isLoading = true;
		},

		loginUserFailid: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		},

		getUser: (state) => {
			state.isLoading = true;
		},

		getUserSuccess: (state, action) => {
			state.isLoading = false;
			state.user.email = action.payload.email;
			state.user.uid = action.payload.uid;
			state.user.nickname = action.payload.nickname;
		},

		getUserFailid: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		},

		logout: (state) => {
			state.isLoading = true;
		},

		logoutSuccess: (state) => {
			state.error = initialState.error;
			state.isLoading = initialState.isLoading;
			state.user.email = initialState.user.email;
			state.user.nickname = initialState.user.nickname;
			state.user.uid = initialState.user.uid;
		},

		logoutFailid: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		},

		removeUserError: (state) => {
			state.error = '';
		},
	},
});

export const {
	registerUser,
	registerUserFailid,
	loginUser,
	loginUserFailid,
	getUser,
	getUserSuccess,
	getUserFailid,
	logout,
	logoutSuccess,
	logoutFailid,
	removeUserError,
} = userSlice.actions;

export default userSlice.reducer;
