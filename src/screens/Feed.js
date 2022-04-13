import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
    View,
} from 'react-native'

import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component {
    state = {
        posts: [{
            id: Math.random(),
            nickname: 'Gabriel Ferreira',
            email: 'gabriel@teste.com.br',
            image: require('../../assets/imgs/fence.jpg'),
            comments: [{
                nickname: 'Diego Anderson',
                comment: 'Bela foto!',
            },{
                nickname: 'Karina Ferreia',
                comment: 'Não curti muito!',
            }]
        },{
            id: Math.random(),
            nickname: 'Mariana Ferreira',
            email: 'mari@teste.com.br',
            image: require('../../assets/imgs/boat.jpg'),
            comments: [{
                nickname: 'Diego Anderson',
                comment: 'que massa',
            },{
                nickname: 'Karina Ferreia',
                comment: 'gostei demais',
            }]

        },{            
            id: Math.random(),
            nickname: 'Diego Anderson',
            email: 'dieanderson@gmail.com',
            image: require('../../assets/imgs/gate.jpg'),
            comments: []  
        }]
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Post key={item.id} {...item} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})

export default Feed
