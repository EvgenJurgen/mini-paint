import styled from 'styled-components';
import { Main as MainStyle } from '../../../core/styles/styled-main';

export const Main = styled(MainStyle)`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  border: none;
`;
