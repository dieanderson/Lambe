import React from 'react'
import { Alert } from 'react-native'
import Navigator from './Navigator'

import useEffectIfNot from './hooks/UseEffectIfNot'
import Splash from './screens/Splash'
import useEvent from './data/hooks/useEvent'

export default props => {
    const { splash, message, messageTitle, clearMessage } = useEvent()

    useEffectIfNot(() => {
        Alert.alert(messageTitle || 'Mensagem', message)
        clearMessage()
    }, [message], [''])       
    
    return splash ? <Splash /> : <Navigator />   
}
