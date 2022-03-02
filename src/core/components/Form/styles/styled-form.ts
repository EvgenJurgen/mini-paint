import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button[type='submit'] {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70ed89;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;
