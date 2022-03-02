import styled from 'styled-components';

export const DrawingArea = styled.div`
  position: relative;

  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90vh;
    @media (max-width: 768px) {
      height: 100vh;
    }
  }
`;
