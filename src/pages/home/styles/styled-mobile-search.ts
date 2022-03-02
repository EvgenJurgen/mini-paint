import styled from 'styled-components';

export const MobileSearch = styled.input`
  width: 90vw;
  height: 3rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textColor};
  padding: 0 0.5rem;
  border: none;
`;
