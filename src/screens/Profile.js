import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'
import md5 from 'crypto-js/md5'

class Profile extends Component {
    
    logout = () => {

    }

    render () {
        const options = { email: 'dieanderson@gmail.com'}
        const avatar = 'https://www.gravatar.com/avatar/'+md5(options.email).toString()

        return (
            <View style={styles.container}>
                <Image source={{ uri: avatar }} style={styles.avatar}/>
                <Text style={styles.nickname}>Diego Anderson</Text>
                <Text style={styles.email}>dieanderson@gmail.com</Text>
                <TouchableOpacity onPress={this.logout} style={styles.button}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100,
    },
    nickname: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
    },
    email: {
        marginTop: 20,
        fontSize: 25,
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
    },
})

export default Profile