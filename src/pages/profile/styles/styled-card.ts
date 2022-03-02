import styled from 'styled-components';
import { Card as CardStyle } from '../../../core/styles/styled-card';
import { DeleteButton } from './styled-delete-button';

export const Card = styled(CardStyle)`
  &:hover ${DeleteButton} {
    opacity: 1;
  }
`;
