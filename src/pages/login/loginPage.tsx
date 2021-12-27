import React, {useState} from 'react'
import {StartingBackground} from '../../core/components/StartingBackground'
import { Main } from '../../core/components/Main';
import { Sidebar } from '../../core/components/Sidebar';
import { Input } from '../../core/components/Input';

import { useAppDispatch, useAppSelector } from '../../core/hooks/redux';
import { loginUser } from '../../core/reducers/userReducer';


 

export const LoginPage = () =>{

    const authorizedUser = useAppSelector((state)=>state.user.user)
    const dispatch = useAppDispatch();

    const [user, setUser] = useState({email:'', password:''})

    const handleChange = (event:any) =>{
        setUser(prevState =>({
            ...prevState, [event.target.name]: event.target.value
        }))
    }

    console.log('auth user',authorizedUser)


    const submitHandler = (event:any) =>{
        event.preventDefault()
        dispatch(loginUser(user))
    }

    return (
        <StartingBackground>
            <Sidebar submitHandler={submitHandler}>
                <h3>Log in</h3>
                <Input type="email" placeholder="Email" name="email" handleChange={handleChange}/>
                <Input type="password" placeholder="Password" name="password" handleChange={handleChange}/>
                <button type='submit'>Log in</button>
                <div>
                <h4>
                    Do you want to <a href='/'>Sign up</a>?
                </h4>
                </div>
            </Sidebar>
            <Main message="Welcome Back"/>
        </StartingBackground>
    )
}

