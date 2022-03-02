import styled from 'styled-components';

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 999999;
  background-color: ${({ theme }) => theme.primary};
  width: ${({ isOpen }) => (isOpen ? '30%' : '0')};

  height: ${({ isOpen }) => (isOpen ? '100%' : '0')};

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '50%' : '0')};
  }
`;
