import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux';
import { logout } from '../../core/reducers/userReducer';
import { AiOutlinePicture, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import styled from 'styled-components';
import { WorkingAriaStyle } from '../../core/components/WorkingAria';
import { Header, HeaderStyle } from '../../core/components/Header';
import { HeaderButtons, HeaderButtonsStyle } from '../../core/components/HeaderButtons';
import { HeaderButtonsItem, HeaderButtonsItemStyle } from '../../core/components/HeaderButtonsItem';
import { getImagesOfAllUsers, ImagesLinksWithUserData } from '../../core/reducers/imagesReducer';
import { CardsMain } from '../../core/components/CardsMain';
import { Card } from '../../core/components/Card';

export const HomePage = () => {
	const dispatch = useAppDispatch();
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

	const getImagesCardsOfUser = (user: ImagesLinksWithUserData) => {
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

	const handleLogout = () => {
		dispatch(logout());
	};

	const navigate = useNavigate();

	const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			setAuthorOfImages(event.target.value);
		} else if (
			(event.key === 'Delete' || event.key === 'Backspace') &&
			event.target.value.length <= 1
		) {
			setAuthorOfImages('');
		}
	};

	return (
		<>

			<MobileSearchHeader
				isOpen={isOpenMobileSearch}
				onClick={() => setIsOpenMobileSearch(false)}
				onKeyDown={handleKeyDown}
			/>
			<Header>
				<Logo>Mini-paint</Logo>

				<Search type="text" placeholder="Поиск" onKeyDown={handleKeyDown} />

				<HeaderButtons>
					<SearchButton>
						<AiOutlineSearch onClick={() => setIsOpenMobileSearch(true)} />
					</SearchButton>
					<HeaderButtonsItem>
						<AiOutlinePicture onClick={() => navigate('/edit')} />
					</HeaderButtonsItem>
					<HeaderButtonsItem>
						<AiOutlineUser onClick={() => navigate('/profile')} />
					</HeaderButtonsItem>
					<LogoutButton>
						<FiLogOut onClick={() => handleLogout()} />
					</LogoutButton>
				</HeaderButtons>
			</Header>
			<WorkingAria>
				<CardsMain>{imagesCards}</CardsMain>
			</WorkingAria>
		</>
	);
};

const MobileSearchHeader = ({ isOpen, onClick, onKeyDown }: any) => {
	return (
		<>
			{isOpen && (
				<MobileSearchHeaderStyle>
					<MobileSearchHeaderButtons>
						<HeaderButtonsItem>
							<IoArrowBack onClick={onClick} />
						</HeaderButtonsItem>
						<div>
							<MobileSearch placeholder="Поиск" onKeyDown={onKeyDown} />
						</div>
					</MobileSearchHeaderButtons>
				</MobileSearchHeaderStyle>
			)}
		</>
	);
};

const WorkingAria = styled(WorkingAriaStyle)`
	top: 0;
	transform: none;
`;

const Logo = styled.div`
	font-size: 2rem;
	font-weight: 700;

	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

const Search = styled.input`
	width: 13rem;
	height: 1.75rem;
	background-color: ${({ theme }) => theme.primary};
	border: 1px solid ${({ theme }) => theme.borderColor};
	border-radius: 3px;
	padding: 0 0.5rem;
	color: ${({ theme }) => theme.textColor};

	@media (max-width: 768px) {
		width: 0;
		height: 0;
		border: none;
	}
`;

const MobileSearch = styled.input`
	width: 90vw;
	height: 3rem;
	background-color: ${({ theme }) => theme.primary};
	color: ${({ theme }) => theme.textColor};
	padding: 0 0.5rem;
	border: none;
`;

const MobileSearchHeaderStyle = styled(HeaderStyle)`
	z-index: 2;
`;

const MobileSearchHeaderButtons = styled(HeaderButtonsStyle)`
	width: 10%;
`;

const SearchButton = styled(HeaderButtonsItemStyle)`
	@media (min-width: 768px) {
		font-size: 0;
	}
`;

const LogoutButton = styled(HeaderButtonsItemStyle)`
	color: #a2242f;
	&:hover {
		color: #ed5a68;
	}
`;

const UserInformation = styled.div`
	height: auto;
	width: 100%;
	border-bottom: 1px solid ${({ theme }) => theme.borderColor};
	padding: 0.1rem 0.5rem;
	h2 {
		font-size: 1.5rem;
		@media (max-width: 768px) {
			font-size: 1.2rem;
		}
	}

	p {
		font-size: 1rem;
		@media (max-width: 768px) {
			font-size: 0.7rem;
		}
	}
`;
