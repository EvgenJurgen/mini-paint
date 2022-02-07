import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from '../core/components/Loader';
import { useAppDispatch, useAppSelector } from '../core/hooks/redux';
import { EditPage } from './editor/EditPage';
import { HomePage } from './home/HomePage';
import { LoginPage } from './login/loginPage';
import { ProfilePage } from './profile/ProfilePage';
import { RegisterPage } from './register/registerPage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUserError } from '../core/reducers/userReducer';
import { removeImagesError } from '../core/reducers/imagesReducer';

toast.configure();
export const AppRoutes = () => {
	const { uid } = useAppSelector((state) => state.user.user);

	const isLoadingUser = useAppSelector((state) => state.user.isLoading);
	const isLoadingImages = useAppSelector((state) => state.images.isLoading);

	const userReducerError = useAppSelector((state) => state.user.error);
	const imagesReducerError = useAppSelector((state) => state.images.error);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userReducerError !== '') {
			toast.error(userReducerError, { position: toast.POSITION.BOTTOM_RIGHT });
			dispatch(removeUserError());
		}

		if (imagesReducerError !== '') {
			toast.error(imagesReducerError, { position: toast.POSITION.BOTTOM_RIGHT });
			dispatch(removeImagesError());
		}
	});

	return (
		<>
			{(isLoadingUser || isLoadingImages) && <Loader />}
			<Routes>
				{uid && (
					<>
						<Route path="/home" element={<HomePage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/edit" element={<EditPage />} />
						<Route path="*" element={<Navigate to="/home" />} />
					</>
				)}
				{!uid && (
					<>
						<Route path="/" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</>
				)}
			</Routes>
		</>
	);
};
