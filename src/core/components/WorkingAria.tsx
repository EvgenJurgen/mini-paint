import React from 'react';
import styled from 'styled-components';

export const WorkingAria = ({ children }: any) => {
	return <WorkingAriaStyle>{children}</WorkingAriaStyle>;
};

export const WorkingAriaStyle = styled.div`
	position: relative;
	width: 100vw;
	max-width: 768px;
	height: auto;
	min-height: 90%;
	@media (max-width: 768px) {
		min-height: 100%;
	}
	display: flex;
	margin: 0 auto;
	top: 50%;
	transform: translate(0, -50%);
`;
