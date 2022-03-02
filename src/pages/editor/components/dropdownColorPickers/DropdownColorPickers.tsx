import React from 'react';
import { Dropdown } from '../dropdown/Dropdown';
import { Checkbox } from './styles/styled-checkbox';
import { ColorPicker } from './styles/styled-color-picker';

type Props = {
  isOpen: boolean;
  color: string;
  handleColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filling: boolean;
  handleSetFilling: () => void;
  fillColor: string;
  handleFillColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TEXT_OF_FILLING_CHECKBOX = 'Filling';

export const DropdownColorPickers = ({
  isOpen,
  color,
  handleColor,
  filling,
  handleSetFilling,
  fillColor,
  handleFillColor,
}: Props): React.ReactElement => {
  return (
    <Dropdown isOpen={isOpen}>
      <ColorPicker>
        <input type="color" onChange={handleColor} value={color} />
        <input type="text" onChange={handleColor} value={color} />
      </ColorPicker>
      <Checkbox>
        <input
          type="checkbox"
          id="filling"
          name="filling"
          checked={filling}
          onChange={handleSetFilling}
        />
        <label htmlFor="filling">{TEXT_OF_FILLING_CHECKBOX}</label>
      </Checkbox>
      {filling && (
        <ColorPicker>
          <input type="color" onChange={handleFillColor} value={fillColor} />
          <input type="text" onChange={handleFillColor} value={fillColor} />
        </ColorPicker>
      )}
    </Dropdown>
  );
};
