import styled from 'styled-components';

export const WorkingArea = styled.div`
  position: relative;
  width: 100vw;
  max-width: 768px;
  height: auto;
  min-height: 90%;
  @media (max-width: 768px) {
    min-height: 100%;
  }
  display: flex;
  margin: 0 auto;
  top: 50%;
  transform: translate(0, -50%);
`;
