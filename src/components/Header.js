import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class Header extends Component {
    render() {
        const name = this.props.name || 'Anonymous'
        const avatar = this.props.email ?             
            <Image source={{ uri: 'https://www.gravatar.com/avatar/'+md5(this.props.email).toString() }} style={styles.avatar}/>
            : null
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon}  style={styles.image}/>
                    <Text style={styles.title}>Lambe Lambe</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {avatar}
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

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}

//export default Header
export default connect(mapStateToProps, null)(Header)