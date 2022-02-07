import React from 'react';
import styled from 'styled-components';

export const HeaderButtonsItem = ({ children }: any) => {
	return <HeaderButtonsItemStyle>{children}</HeaderButtonsItemStyle>;
};

export const HeaderButtonsItemStyle = styled.div`
	font-size: 2.5rem;
	padding-top: 0.5rem;
	padding-right: 0.5rem;
	cursor: pointer;
	&:hover {
		color: ${({ theme }) => theme.hoverColor};
	}
	@media (max-width: 768px) {
		font-size: 1.75rem;
	}
`;
