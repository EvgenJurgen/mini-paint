import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './login/loginPage'
import { RegisterPage } from './register/registerPage'

export const useRoutes = (isAuthenticated:boolean) =>{
    if(isAuthenticated){
        return (
            <Routes>
                
            </Routes>
        )
    } else{
        return (
            <Routes>
                <Route path="/" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="*" element={<RegisterPage />} />
            </Routes>
        )
    }
}