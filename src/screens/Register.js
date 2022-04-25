import React, {Component} from 'react'
import { connect, Connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import { createUser } from '../store/actions/user'

class Register extends Component {
    state= {
        name: '',
        email: '',
        password: '',
    }

    render () {
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder='Nome'
                    style={styles.input}
                    autoFocus={true}
                    autoCapitalize='words'
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput 
                    placeholder='E-mail'
                    style={styles.input}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput 
                    placeholder='Senha'
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <TouchableOpacity 
                    onPress={() => { this.props.onCreateUser(this.state) }} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
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
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
    },
    buttonText:{
        fontSize: 20,
        color: '#FFF',
    },
})

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}

//export default Register
export default connect(null, mapDispatchToProps)(Register)