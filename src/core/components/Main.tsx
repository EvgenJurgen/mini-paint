import React from 'react'
import styled from 'styled-components'

interface Props{
    message:string
}

export const Main = ({message}:Props) =>{
    return (
        <Container>
            <h1>
                {message}
            </h1>
        </Container>
    )
}
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
    font-size: 65px;
    font-weight: 900;
    color: #343434;
    @media (max-width: 900px) {
      display: none;
    }
  }
`