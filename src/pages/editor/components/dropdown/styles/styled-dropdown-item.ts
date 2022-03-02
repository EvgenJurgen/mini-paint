import styled from 'styled-components';

export const DropdownItem = styled.span`
  display: inline-flex;
  align-items: center;
  width: 90%;
  padding: 4px 12px;
  margin: 10px 2px;
  border: 1px solid ${({ theme }) => theme.additionalBorderColor};
  border-radius: 4px;

  input[type='text'] {
    background-color: ${({ theme }) => theme.secondary};
    border: none;
    border-radius: 3px;
    width: 100%;
    font-size: 14px;
  }
`;
