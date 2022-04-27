import React from 'react'
import {
    StyleSheet,
    Platform,
    Text,
    View,
    Image,
    SafeAreaView,
} from 'react-native'
import md5 from 'crypto-js/md5'

import icon from '../../assets/imgs/icon.png'
import useUser from '../data/hooks/useUser'

export default props => {
    const { name, email } = useUser()

    const username = name || 'Anonymous'
    const avatar = email ?             
        <Image source={{ uri: 'https://www.gravatar.com/avatar/'+md5(email).toString() }} style={styles.avatar}/>
        : null
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.rowContainer}>
                <Image source={icon}  style={styles.image}/>
                <Text style={styles.title}>Lambe Lambe</Text>
            </View>
            <View style={styles.userContainer}>
                <Text style={styles.user}>{username}</Text>
                {avatar}
            </View>
        </SafeAreaView>
    )    
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 10 : 0,
    },
    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    title: {
        color: '#000',
        fontFamily: 'shelter',
        height: 30,
        fontSize: 28,
    },
    avatar: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 15,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        fontSize: 10,
        color: '#888',
        marginRight:10,
    },
})