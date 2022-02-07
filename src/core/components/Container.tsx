import React from 'react';
import styled from 'styled-components';

export const Container = ({ children }: any) => {
	return <ContainerStyle>{children}</ContainerStyle>;
};

export const ContainerStyle = styled.div`
	width: auto;
	height: 100vh;
	background-color: ${({ theme }) => theme.primary};
`;
