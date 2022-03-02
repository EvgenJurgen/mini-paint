import React, { useContext, useEffect, useMemo } from 'react';

import { ThemeContext } from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../core/hooks/redux';
import { useDispatch } from 'react-redux';

import { deleteImageByUrl, getImagesOfCurrentUser } from '../../core/actions/imageActions';

import { TiHome } from 'react-icons/ti';
import { AiOutlineDelete } from 'react-icons/ai';

import Moon from '../images/../../assets/images/toggleTheme/moon.png';
import Sun from '../../assets/images/toggleTheme/sun.svg';

import { HeaderButtonsItem } from '../../core/styles/styled-header-buttons-item';
import { Header } from '../../core/styles/styled-header';
import { HeaderButtons } from '../../core/styles/styled-header-buttons';
import { CardsMain } from '../../core/styles/styled-cards-main';

import { HeaderUserInformation } from './styles/styled-header-user-information';
import { DeleteButton } from './styles/styled-delete-button';
import { Toggle } from './styles/styled-toggle';
import { ThemeImage } from './styles/styled-theme-image';
import { WorkingArea } from './styles/styled-working-area';
import { Card } from './styles/styled-card';

import { HOME_ROUTE } from '../AppRoutes';

export const ProfilePage = (): React.ReactElement => {
  const { uid, email, nickname } = useAppSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const { imagesOfCurrentUser } = useAppSelector((state) => state.images);

  useEffect(() => {
    dispatch(getImagesOfCurrentUser({ uid }));
  }, []);

  const cards = useMemo(() => {
    return imagesOfCurrentUser.map((url: string) => {
      return (
        <Card key={url}>
          <DeleteButton>
            <AiOutlineDelete onClick={() => handleDelete(url)} />
          </DeleteButton>
          <img src={url} />
        </Card>
      );
    });
  }, [imagesOfCurrentUser]);

  const handleDelete = (url: string) => {
    dispatch(deleteImageByUrl({ url }));
  };

  const navigate = useNavigate();
  const handleToHomePage = () => {
    navigate(HOME_ROUTE);
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Header>
        <HeaderUserInformation>
          <h2>@{nickname}</h2>
          <p>{email}</p>
        </HeaderUserInformation>
        <HeaderButtons>
          <HeaderButtonsItem>
            <TiHome onClick={handleToHomePage} />
          </HeaderButtonsItem>
          <HeaderButtonsItem>
            <Toggle onClick={toggleTheme}>
              <ThemeImage src={theme === 'light' ? `${Moon}` : `${Sun}`} />
            </Toggle>
          </HeaderButtonsItem>
        </HeaderButtons>
      </Header>
      <WorkingArea>
        <CardsMain>{cards}</CardsMain>
      </WorkingArea>
    </>
  );
};
