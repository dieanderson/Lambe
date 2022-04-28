import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import useUser from '../data/hooks/useUser'

export default props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useUser()

    return (
        <View style={styles.container}>        
            
            <TextInput 
                placeholder='E-mail'
                style={styles.input}
                autoFocus={true}
                keyboardType='email-address'
                value={email}
                autoCapitalize='none'
                onChangeText={setEmail}
            />
            <TextInput 
                placeholder='Senha'
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => login(email, password)} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.dividerLine} />            

            <TouchableOpacity onPress={() => {}} style={styles.buttonGoogle}>
            <Icon name='google' size={25} color='#de4d41' style={{marginLeft:20}}/>
                <Text style={styles.buttonGoogleText}>                    
                    Entrar com o Google
                </Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => {props.navigation.navigate('Register')}}>
                <Text style={styles.text}>Não tem uma conta? Crie aqui</Text>
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
        borderRadius: 5,
        paddingLeft: 15,
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        borderRadius: 5,
        width: '90%',
        marginBottom: 20,
    },
    buttonText:{
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center'
    },
    buttonGoogle: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f5e7ea',
        borderRadius: 5,
        width: '90%',
        flexDirection: 'row',
    },
    buttonGoogleText: {
        fontSize: 20,
        color: '#de4d41',
        textAlign: 'center',
        marginLeft: 40,
    },
    text: {
        marginTop: 40,
        fontSize: 20,
        color: '#4286f4',
    },
    dividerLine: {
        width: '90%',
        height: 1,
        backgroundColor: '#e8e8e8',
    },
})