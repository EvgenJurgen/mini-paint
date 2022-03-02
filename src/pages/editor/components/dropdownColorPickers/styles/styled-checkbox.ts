import styled from 'styled-components';
import { DropdownItem } from '../../dropdown/styles/styled-dropdown-item';

export const Checkbox = styled(DropdownItem)`
  border: none;
  input[type='checkbox'] {
    margin-right: 8px;
    cursor: pointer;
  }
`;
