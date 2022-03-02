import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  width: auto;
  height: auto;
  display: block;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 3px;
  margin-bottom: 1rem;

  img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    vertical-align: middle;
  }
`;
