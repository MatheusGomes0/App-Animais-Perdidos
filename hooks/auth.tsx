import React, { createContext, useContext, useState } from 'react'
import { router } from 'expo-router'
import { IAuthContext,IAuthProviderProps, IUserLogin } from "../interface/login"
import { setItemAsync, deleteItemAsync } from 'expo-secure-store'

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserLogin>({email:'',password:''})

    const handleLogin = () => {
        if (user.email == 'admin' && user.password == 'admin') {
            setItemAsync('user', user.email)
            router.push('/home')
        } else {
            alert('Usuário ou senha inválidos')
        }
    }

    const handleLogout = () => {
        setUser({email:'', password:''})
        deleteItemAsync('user')
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}