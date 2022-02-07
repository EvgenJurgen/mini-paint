import React from 'react';
import styled from 'styled-components';

export const HeaderButtons = ({ children }: any) => {
	return <HeaderButtonsStyle>{children}</HeaderButtonsStyle>;
};

export const HeaderButtonsStyle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
