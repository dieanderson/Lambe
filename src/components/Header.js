import React, { Component } from 'react'
import {
    StyleSheet,
    Platform,
    Text,
    View,
    Image,
    SafeAreaView,
} from 'react-native'

import icon from '../../assets/imgs/icon.png'

class Header extends Component {
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon}  style={styles.image}/>
                    <Text style={styles.title}>Lambe Lambe</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
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
})

export default Header