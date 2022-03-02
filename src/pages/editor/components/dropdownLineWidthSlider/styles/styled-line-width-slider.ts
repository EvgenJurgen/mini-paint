import styled from 'styled-components';
import { DropdownItem } from '../../dropdown/styles/styled-dropdown-item';

export const LineWidthSlider = styled(DropdownItem)<{ value: number }>`
  input[type='range'] {
    width: 400%;
    margin-right: 8px;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    height: 12px;
    border-radius: 40px;
    background: ${(props) =>
      `linear-gradient(to right, ${props.theme.selectedColor} 0%, ${props.theme.selectedColor} ${props.value}%, #fff ${props.value}%, #fff 100%);`};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 24px;
      height: 24px;
      background-color: ${({ theme }) => theme.selectedColor};
      border-radius: 50%;
      box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
    }

    ::-moz-range-thumb {
      width: 24px;
      height: 24px;
      -moz-appearance: none;
      background-color: ${({ theme }) => theme.selectedColor};
      border-radius: 50%;
      box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
    }
  }
`;
