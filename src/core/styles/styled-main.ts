import styled from 'styled-components';

export const Main = styled.div`
  width: 90%;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 3px;
`;
