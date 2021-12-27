import React from 'react'
import styled from 'styled-components'

interface Props {
    type:string,
    placeholder:string,
    name:string,
    handleChange:any
}

export const Input = ({type, placeholder, name, handleChange}:Props) =>{
    return (
        <Container>
            <StyledInput placeholder={placeholder} type={type} name={name} onChange={handleChange}
            required
            autoComplete='off'/>
        </Container>
    )
}

const StyledInput = styled.input`
    width:80%;
    max-width: 350px;
    min-width: 250px;
    height:40px;
    border: none;
    margin:0.5rem 0;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    &:hover{
        transform: translateY(-3px);
    }
`

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`