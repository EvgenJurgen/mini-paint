import { createSlice } from '@reduxjs/toolkit';

export interface ImagesLinksWithUserData {
	email: string;
	nickname: string;
	urls: string[];
}

export type ImagesLinksWithDataOfUsers = Array<ImagesLinksWithUserData>;

const initialState = {
	imagesOfCurrentUser: <string[]>[],
	imagesOfAllUsers: <ImagesLinksWithDataOfUsers>[],
	isLoading: false,
	error: '',
};

export const imagesSlice = createSlice({
	name: 'images',
	initialState,
	reducers: {
		getImagesOfCurrentUser: (state, action) => {
			state.isLoading = true;
		},

		getImagesOfCurrentUserSuccess: (state, action) => {
			state.imagesOfCurrentUser = action.payload.imagesOfCurrentUser;
			state.isLoading = false;
		},

		getImagesOfCurrentUserFailid: (state, action) => {
			state.error = action.payload.error;
			state.isLoading = false;
		},

		getImagesOfAllUsers: (state) => {
			state.isLoading = true;
		},

		getImagesOfAllUsersSuccess: (state, action) => {
			state.imagesOfAllUsers = action.payload.imagesOfAllUsers;
			state.isLoading = false;
		},

		getImagesOfAllUsersFailid: (state, action) => {
			state.error = action.payload.error;
			state.isLoading = false;
		},

		saveImageOfUser: (state, action) => {
			state.isLoading = true;
		},

		saveImageOfUserSuccess: (state) => {
			state.isLoading = false;
		},

		saveImageOfUserFailid: (state, action) => {
			state.error = action.payload.error;
			state.isLoading = false;
		},

		deleteImageByUrl: (state, action) => {
			state.isLoading = true;
		},

		deleteImageByUrlSuccess: (state, action) => {
			state.imagesOfCurrentUser = state.imagesOfCurrentUser.filter(
				(imageUrl) => imageUrl != action.payload.url
			);
			state.isLoading = false;
		},

		deleteImageByUrlFailid: (state, action) => {
			state.error = action.payload.error;
			state.isLoading = false;
		},

		removeImagesError: (state) => {
			state.error = '';
		},
	},
});

export const {
	getImagesOfCurrentUser,
	getImagesOfCurrentUserSuccess,
	getImagesOfCurrentUserFailid,
	getImagesOfAllUsers,
	getImagesOfAllUsersSuccess,
	getImagesOfAllUsersFailid,
	saveImageOfUser,
	saveImageOfUserSuccess,
	saveImageOfUserFailid,
	deleteImageByUrl,
	deleteImageByUrlSuccess,
	deleteImageByUrlFailid,
	removeImagesError,
} = imagesSlice.actions;

export default imagesSlice.reducer;
