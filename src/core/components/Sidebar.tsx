import React from 'react'
import styled from 'styled-components'


export const Sidebar = ({submitHandler, children}:any) =>{
    return (
        <Container>
           <Form onSubmit={submitHandler}>
                {children}
           </Form>
        </Container>
    )
}

const Container = styled.div`
    min-width: 400px;
    backdrop-filter: blur(35px);
    background-color: rgba(255,255,255,0.8);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 2rem;

    @media (max-width: 900px){
        width: 100vw;
        position: absolute;
        padding: 0;
    }

    h4{
        color: #808080;
        font-weight: bold;
        font-size: 13px;
        margin-top: 2rem;
        a{
            color:#ff8d8d;
            cursor: pointer;
        }
    }
`

const Form = styled.form`
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    h3{
    color:#666666;
    margin-bottom: 2rem;
    }

    button{
        width:75%;
        max-width: 350px;
        min-width: 250px;
        height:40px;
        border: none;
        margin:1rem 0;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
        border-radius: 8px;
        background-color: #70ED89;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in;

        &:hover{
            transform: translateY(-3px);
        }
    }
`