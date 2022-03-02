import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate360} 0.6s linear infinite;
  border-top: 4px solid #989898;
  border-right: 4px solid #989898;
  border-bottom: 4px solid #989898;
  border-left: 4px solid #584169;
  border-radius: 50%;
`;
