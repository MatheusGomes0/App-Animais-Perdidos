import { ReactNode } from "react"

export interface IUserLogin {
    email: string
    password: string
}

export interface IAuthContext {
    user: IUserLogin
    setUser: (user: IUserLogin) => void
    handleLogin: () => void
    hangleLogout: () => void
}

export interface IAuthProviderProps {
    children: ReactNode
}