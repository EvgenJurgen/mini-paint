import styled from 'styled-components';

export const UserInformation = styled.div`
  height: auto;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 0.1rem 0.5rem;
  h2 {
    font-size: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  p {
    font-size: 1rem;
    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;
