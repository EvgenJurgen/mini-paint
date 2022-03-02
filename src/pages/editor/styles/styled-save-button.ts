import styled from 'styled-components';
import { SidebarItem } from './styled-sidebar-item';

export const SaveButton = styled(SidebarItem)`
  color: hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%);
  border-left: none;
  &:hover {
    color: hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 30%);
  }
`;
