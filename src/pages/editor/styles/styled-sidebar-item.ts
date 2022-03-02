import styled from 'styled-components';

export const SidebarItem = styled.div<{ tool?: string; currentTool?: string }>`
  padding: 0.4rem 0;
  cursor: pointer;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    color: ${({ theme }) => theme.hoverColor};
  }

  border-left: ${(props) =>
    props.tool === props.currentTool ? `3px solid ${props.theme.selectedColor}` : 'none'};
  border-radius: 2px;
`;
