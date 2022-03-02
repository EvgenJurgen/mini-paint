import styled from 'styled-components';
import { Main } from './styled-main';

export const CardsMain = styled(Main)`
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
