import React, { useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../core/hooks/redux';
import { useDispatch } from 'react-redux';
import { Loader } from '../core/components/Loader/Loader';
import { EditPage } from './editor/EditPage';
import { HomePage } from './home/HomePage';
import { LoginPage } from './login/loginPage';
import { ProfilePage } from './profile/ProfilePage';
import { RegisterPage } from './register/registerPage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUserError } from '../core/actions/userActions';
import { removeImageError, removeMessageAboutSavingAnImage } from '../core/actions/imageActions';

export const REGISTER_ROUTE = '/';
export const LOGIN_ROUTE = '/login';

export const HOME_ROUTE = '/home';
export const PROFILE_ROUTE = '/profile';
export const EDIT_ROUTE = '/edit';

const ANY_ROUTE = '*';

const publicRoutes = [
  { path: REGISTER_ROUTE, component: <RegisterPage /> },
  { path: LOGIN_ROUTE, component: <LoginPage /> },
  { path: ANY_ROUTE, component: <Navigate to={LOGIN_ROUTE} /> },
];

const privateRoutes = [
  { path: HOME_ROUTE, component: <HomePage /> },
  { path: PROFILE_ROUTE, component: <ProfilePage /> },
  { path: EDIT_ROUTE, component: <EditPage /> },
  { path: ANY_ROUTE, component: <Navigate to={HOME_ROUTE} /> },
];

const MESSAGE_ABOUT_SAVING_AN_IMAGE = 'Picture is saved';

toast.configure();
export const AppRoutes = (): React.ReactElement => {
  const { uid } = useAppSelector((state) => state.user.user);

  const isLoadingUser = useAppSelector((state) => state.user.isLoading);
  const isLoadingImages = useAppSelector((state) => state.images.isLoading);

  const userReducerError = useAppSelector((state) => state.user.error);
  const imagesReducerError = useAppSelector((state) => state.images.error);
  const isPictureSaved = useAppSelector((state) => state.images.isPictureSaved);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userReducerError !== '') {
      toast.error(userReducerError, { position: toast.POSITION.BOTTOM_RIGHT });
      dispatch(removeUserError());
    }

    if (imagesReducerError !== '') {
      toast.error(imagesReducerError, { position: toast.POSITION.BOTTOM_RIGHT });
      dispatch(removeImageError());
    }

    if (isPictureSaved) {
      toast.success(MESSAGE_ABOUT_SAVING_AN_IMAGE, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      dispatch(removeMessageAboutSavingAnImage());
    }
  });

  const routes = useMemo(() => {
    if (uid) {
      return privateRoutes;
    } else {
      return publicRoutes;
    }
  }, [uid]);

  return (
    <>
      {(isLoadingUser || isLoadingImages) && <Loader />}
      <Routes>
        {routes.map((route) => {
          return <Route path={route.path} element={route.component} key={route.path} />;
        })}
      </Routes>
    </>
  );
};
