import React, { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../core/hooks/redux';
import { useDispatch } from 'react-redux';

import { logout } from '../../core/actions/userActions';

import { getImagesOfAllUsers } from '../../core/actions/imageActions';

import { AiOutlinePicture, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';

import { Header } from '../../core/styles/styled-header';
import { HeaderButtons } from '../../core/styles/styled-header-buttons';
import { HeaderButtonsItem } from '../../core/styles/styled-header-buttons-item';
import { Card } from '../../core/styles/styled-card';
import { CardsMain } from '../../core/styles/styled-cards-main';

import { MobileSearch } from './styles/styled-mobile-search';
import { Search } from './styles/styled-search';
import { Logo } from './styles/styled-logo';
import { MobileSearchHeaderButtons } from './styles/styled-mobile-siarch-header-buttons';
import { SearchButton } from './styles/styled-search-button';
import { LogoutButton } from './styles/styled-logout-botton';
import { UserInformation } from './styles/styled-user-information';
import { WorkingArea } from './styles/styled-working-area';
import { MobileSearchHeaderStyle } from './styles/styled-mobile-search-header';

import { EDIT_ROUTE, PROFILE_ROUTE } from '../AppRoutes';
import { UserDataWithImages } from '../../core/interfaces/payloads/ArrayOfUserDataWithImages';

const LOGO_TEXT = 'Mini-paint';
const SEARCH_PLACEHOLDER_TEXT = 'Поиск';

export const HomePage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { imagesOfAllUsers } = useAppSelector((state) => state.images);

  useEffect(() => {
    dispatch(getImagesOfAllUsers());
  }, []);

  const [authorOfImages, setAuthorOfImages] = useState('');

  const images = useMemo(() => {
    if (!authorOfImages) {
      return imagesOfAllUsers;
    }
    const selectedAuthor = imagesOfAllUsers.filter((user) => user.nickname === authorOfImages);
    if (selectedAuthor.length === 0) {
      return [];
    } else {
      return selectedAuthor;
    }
  }, [imagesOfAllUsers, authorOfImages]);

  const getImagesCardsOfUser = (user: UserDataWithImages) => {
    return user.urls.map((url) => {
      return (
        <Card key={url}>
          <UserInformation>
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
          </UserInformation>
          <img src={url} />
        </Card>
      );
    });
  };

  const imagesCards = useMemo(() => {
    return images.map((userImages) => getImagesCardsOfUser(userImages));
  }, [images]);

  const handleSetIsOpenMobileSearch = () => {
    setIsOpenMobileSearch(!isOpenMobileSearch);
  };

  const navigate = useNavigate();

  const handleNavigateToEditPage = () => {
    navigate(EDIT_ROUTE);
  };

  const handleNavigateToProfilePage = () => {
    navigate(PROFILE_ROUTE);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter') {
      setAuthorOfImages(value);
    } else if ((event.key === 'Delete' || event.key === 'Backspace') && value.length <= 1) {
      setAuthorOfImages('');
    }
  };

  return (
    <>
      <MobileSearchHeader
        isOpen={isOpenMobileSearch}
        onClick={handleSetIsOpenMobileSearch}
        onKeyDown={handleKeyDown}
      />
      <Header>
        <Logo>{LOGO_TEXT}</Logo>

        <Search type="text" placeholder={SEARCH_PLACEHOLDER_TEXT} onKeyDown={handleKeyDown} />

        <HeaderButtons>
          <SearchButton>
            <AiOutlineSearch onClick={handleSetIsOpenMobileSearch} />
          </SearchButton>
          <HeaderButtonsItem>
            <AiOutlinePicture onClick={handleNavigateToEditPage} />
          </HeaderButtonsItem>
          <HeaderButtonsItem>
            <AiOutlineUser onClick={handleNavigateToProfilePage} />
          </HeaderButtonsItem>
          <LogoutButton>
            <FiLogOut onClick={handleLogout} />
          </LogoutButton>
        </HeaderButtons>
      </Header>
      <WorkingArea>
        <CardsMain>{imagesCards}</CardsMain>
      </WorkingArea>
    </>
  );
};

interface MobileSearchHeaderInterface {
  isOpen: boolean;
  onClick: React.MouseEventHandler<SVGElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const MobileSearchHeader = ({ isOpen, onClick, onKeyDown }: MobileSearchHeaderInterface) => {
  return (
    <>
      {isOpen && (
        <MobileSearchHeaderStyle>
          <MobileSearchHeaderButtons>
            <HeaderButtonsItem>
              <IoArrowBack onClick={onClick} />
            </HeaderButtonsItem>
            <div>
              <MobileSearch placeholder={SEARCH_PLACEHOLDER_TEXT} onKeyDown={onKeyDown} />
            </div>
          </MobileSearchHeaderButtons>
        </MobileSearchHeaderStyle>
      )}
    </>
  );
};
