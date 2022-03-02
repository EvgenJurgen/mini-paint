import React from 'react';
import { DropdownMenu } from './styles/styled-dropdown-menu';

export const Dropdown = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}): React.ReactElement => {
  return <DropdownMenu isOpen={isOpen}>{isOpen && children}</DropdownMenu>;
};
