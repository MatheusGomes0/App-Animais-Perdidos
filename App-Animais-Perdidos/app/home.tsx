import { Text } from 'react-native'
import { Link } from 'expo-router'

export default function Home(){
    return (
        <>
        <Text>Login com sucesso!</Text>
        <Link href="/">Voltar ao login</Link>
        </>
    )
}