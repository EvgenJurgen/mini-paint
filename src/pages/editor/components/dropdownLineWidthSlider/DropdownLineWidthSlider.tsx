import React from 'react';
import { Dropdown } from '../dropdown/Dropdown';
import { LineWidthSlider } from './styles/styled-line-width-slider';

type Props = {
  isOpen: boolean;
  lineWidth: number;
  handleLineWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DropdownLineWidthSlider = ({
  isOpen,
  lineWidth,
  handleLineWidth,
}: Props): React.ReactElement => {
  return (
    <Dropdown isOpen={isOpen}>
      <LineWidthSlider value={lineWidth}>
        <input type="range" onChange={handleLineWidth} value={lineWidth} />
        <input type="text" onChange={handleLineWidth} value={lineWidth} />
      </LineWidthSlider>
    </Dropdown>
  );
};
