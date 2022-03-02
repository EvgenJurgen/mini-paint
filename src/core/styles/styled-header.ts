import styled from 'styled-components';

export const Header = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 0.75rem;
  align-items: center;
  width: 100vw;
  height: auto;
  background-color: ${({ theme }) => theme.navbarColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  z-index: 1;
`;
