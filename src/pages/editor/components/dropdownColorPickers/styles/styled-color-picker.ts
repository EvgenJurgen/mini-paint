import styled from 'styled-components';
import { DropdownItem } from '../../dropdown/styles/styled-dropdown-item';

export const ColorPicker = styled(DropdownItem)`
  input[type='color'] {
    margin-right: 8px;
    -webkit-appearance: none;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background: none;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
      width: 14px;
      height: 14px;
    }
    &::-webkit-color-swatch {
      border: 1px solid ${({ theme }) => theme.additionalBorderColor};
      border-radius: 4px;
      padding: 0;
    }
  }
`;
