import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'
import md5 from 'crypto-js/md5'

import useUser from "../data/hooks/useUser"

export default props => {
    const { name, email, logout } = useUser()
    
    const options = { email }
    const avatar = 'https://www.gravatar.com/avatar/'+md5(options.email).toString()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sua Conta</Text>
            <Image source={{ uri: avatar }} style={styles.avatar}/>
            <Text style={styles.nickname}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity onPress={logout} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        marginTop: 70,
        fontSize: 20,
        fontWeight: 'bold',    
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 80,
    },
    nickname: {
        marginTop: 30,
        fontSize: 25,
    },
    email: {
        marginTop: 20,
        fontSize: 20,
    },
    button: {
        width: '90%',
        marginTop: 50,
        padding: 10,
        backgroundColor: '#4286f4',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
    },
})