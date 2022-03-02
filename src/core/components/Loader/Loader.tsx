import React from 'react';
import { Container } from './styles/styled-container';
import { Spinner } from './styles/styled-spinner';

export const Loader = (): React.ReactElement => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};
