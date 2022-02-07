import React, { useContext, useEffect, useMemo } from 'react';
import { deleteImageByUrl, getImagesOfCurrentUser } from '../../core/reducers/imagesReducer';
import { TiHome } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { WorkingAriaStyle } from '../../core/components/WorkingAria';
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux';
import { AiOutlineDelete } from 'react-icons/ai';
import Moon from '../images/../../assets/images/toggleTheme/moon.png';
import Sun from '../../assets/images/toggleTheme/sun.svg';
import { HeaderButtonsItem } from '../../core/components/HeaderButtonsItem';
import { Header } from '../../core/components/Header';
import { HeaderButtons } from '../../core/components/HeaderButtons';
import { CardsMain } from '../../core/components/CardsMain';
import { CardStyle } from '../../core/components/Card';

export const ProfilePage = () => {
	const { uid, email, nickname } = useAppSelector((state) => state.user.user);

	const dispatch = useAppDispatch();
	const { imagesOfCurrentUser } = useAppSelector((state) => state.images);

	useEffect(() => {
		dispatch(getImagesOfCurrentUser({ uid }));
	}, []);

	const cards = useMemo(() => {
		return imagesOfCurrentUser.map((url) => {
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
		navigate('/home');
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
						<TiHome onClick={() => handleToHomePage()} />
					</HeaderButtonsItem>
					<HeaderButtonsItem>
						<Toggle onClick={toggleTheme}>
							<ThemeImage src={theme === 'light' ? `${Moon}` : `${Sun}`} />
						</Toggle>
					</HeaderButtonsItem>
				</HeaderButtons>
			</Header>
			<WorkingAria>
				<CardsMain>{cards}</CardsMain>
			</WorkingAria>
		</>
	);
};

const WorkingAria = styled(WorkingAriaStyle)`
	top: 0;
	transform: none;
`;

const HeaderUserInformation = styled.div`
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

const DeleteButton = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	margin: 0.5rem;
	font-size: 3rem;
	color: #a2242f;
	opacity: 0;
	transition: 0.5s;
	&:hover {
		color: #ed5a68;
	}
`;

const Card = styled(CardStyle)`
	&:hover ${DeleteButton} {
		opacity: 1;
	}
`;

const ThemeImage = styled.img`
	max-width: 2.5rem;

	@media (max-width: 768px) {
		max-width: 1.75rem;
	}
`;

const Toggle = styled.button`
	border: none;
	outline: none;
	cursor: pointer;
	background: none;
`;
