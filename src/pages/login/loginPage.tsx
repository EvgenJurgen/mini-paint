import React from 'react'
import {StartingBackground} from '../../core/components/StartingBackground'
import { Main } from '../../core/components/Main';
import { Sidebar } from '../../core/components/Sidebar';
import { Input } from '../../core/components/Input';


 

export const LoginPage = () =>{
    return (
        <StartingBackground>
            <Sidebar>
                <h3>Log in</h3>
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <button>Log in</button>
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

