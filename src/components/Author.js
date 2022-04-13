import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
import md5 from 'crypto-js/md5'

export default props => {
    const avatar = 'https://www.gravatar.com/avatar/'+md5(props.email).toString()
    return(
        <View style={styles.container}>
            <Image source={{ uri: avatar }} style={styles.avatar}/>                
            <Text style={styles.nickname}>{props.nickname}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    nickname: {
        color: '#444',
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
})