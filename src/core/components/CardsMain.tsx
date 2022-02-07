import React from 'react';
import styled from 'styled-components';
import { MainStyle } from './Main';

export const CardsMain = ({ children }: any) => {
	return <CardsMainStyle>{children}</CardsMainStyle>;
};

const CardsMainStyle = styled(MainStyle)`
	background-color: ${({ theme }) => theme.primary};
	border: none;
	border-radius: 0;
	width: auto;
	height: auto;
	position: relative;
	margin: 0 auto;
	margin-top: 5rem;

	@media (max-width: 768px) {
		margin-top: 4rem;
	}
`;
