import React from 'react';
import { Container } from './styles/styled-container';
import { Input as InputStyle } from './styles/styled-input';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({ type, placeholder, name, handleChange }: Props): React.ReactElement => {
  return (
    <Container>
      <InputStyle
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
        required
        autoComplete="off"
      />
    </Container>
  );
};
