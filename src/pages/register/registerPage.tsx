import React from 'react'
import { Input } from '../../core/components/Input'
import { Main } from '../../core/components/Main'
import { Sidebar } from '../../core/components/Sidebar'
import { StartingBackground } from '../../core/components/StartingBackground'


export const RegisterPage = () =>{
    return (
        <StartingBackground>
            <Sidebar>
                <h3>Sign up</h3>
                <Input type="text" placeholder="Full Name"/>
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <Input type="password" placeholder="Repeat Password"/>
                <button>Sign up</button>
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
