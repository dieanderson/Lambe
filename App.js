/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react'
import { 
    View,
} from 'react-native'

import Header from './src/components/Header'
import Post from './src/components/Post'

export default class App extends Component {
    render() {

        const comments = [{
            nickname: 'Karina Ferreira',
            comment: 'Linda foto!',
        },{
            nickname: 'Gabriel Ferreira',
            comment: 'Não gostei da paisagem!',    
        }]

        return(
            <View style={{ flex: 1 }}>
                <Header />
                <Post 
                    image={require('./assets/imgs/fence.jpg')}
                    comments={comments}
                />

            </View>
        )
    }
}

