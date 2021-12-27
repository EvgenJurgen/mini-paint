import React, { useState } from 'react'
import { Input } from '../../core/components/Input'
import { Main } from '../../core/components/Main'
import { Sidebar } from '../../core/components/Sidebar'
import { StartingBackground } from '../../core/components/StartingBackground'
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux'
import { registerUser } from '../../core/reducers/userReducer'


export const RegisterPage = () =>{

    const authorizedUser = useAppSelector(state=>state.user.user)
    const error = useAppSelector(state=>state.user.error)
    const dispatch = useAppDispatch();

    const [user, setUser] = useState({nickname:'', email:'', password:'', repeatedPassword:''})

    const handleChange = (event:any) =>{
        setUser(prevState =>({
            ...prevState, [event.target.name]: event.target.value
        }))
    }

    console.log('registered user',authorizedUser)
    console.log('error', error)

    const submitHandler = (event:any) =>{
        event.preventDefault()
        dispatch(registerUser(user))
    }

    return (
        <StartingBackground>
            <Sidebar submitHandler={submitHandler}>
                <h3>Sign up</h3>
                <Input type="text" placeholder="Nickname" name="nickname" handleChange={handleChange}/>
                <Input type="email" placeholder="Email" name="email" handleChange={handleChange}/>
                <Input type="password" placeholder="Password" name="password" handleChange={handleChange}/>
                <Input type="password" placeholder="Repeat Password" name="repeatedPassword" handleChange={handleChange}/>
                <button type='submit'>Sign up</button>
                <div>
                <h4>
                    Already have an account? <a href='/login'>Log In</a>
                </h4>
                </div>
            </Sidebar>
            <Main message="Join Our Team"/>
        </StartingBackground>
    )
}
