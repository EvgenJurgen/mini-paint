import React from 'react';
import { Form as FormStyle } from './styles/styled-form';

export const Form = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler;
}): React.ReactElement => {
  return <FormStyle onSubmit={onSubmit}>{children}</FormStyle>;
};
