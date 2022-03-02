import styled from 'styled-components';

export const Search = styled.input`
  width: 13rem;
  height: 1.75rem;
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 3px;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.textColor};

  @media (max-width: 768px) {
    width: 0;
    height: 0;
    border: none;
  }
`;
