import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import useUser from '../data/hooks/useUser'

export default props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { createUser } = useUser()
        
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder='Nome'
                style={styles.input}
                autoFocus={true}
                autoCapitalize='words'
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                placeholder='E-mail'
                style={styles.input}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                placeholder='Senha'
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity 
                onPress={() => createUser({name, email, password})} 
                style={styles.button}
            >
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15,
        borderRadius: 5,
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        width: '90%',
        borderRadius: 5,
    },
    buttonText:{
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
    },
})