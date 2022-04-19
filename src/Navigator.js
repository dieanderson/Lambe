import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

const Tab = createBottomTabNavigator()
const SwitchStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

const routeIcon = {
    Feed: 'home',
    AddPhoto: 'camera',
    Profile: 'user'
}

export default props => {
    

    const Auth = () => (
        <AuthStack.Navigator initialRouteName='Login'>
            <AuthStack.Screen name='Login' component={Login} />
            <AuthStack.Screen name='Register' component={Register} />
        </AuthStack.Navigator>
    )

    const AuthOrProfile = () => (
        <SwitchStack.Navigator screenOptions={{headerShown: false}}>
            <SwitchStack.Screen name='Auth' component={Auth} />  
            <SwitchStack.Screen name='Home' component={Profile} />                      
        </SwitchStack.Navigator>
    )
    
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='Feed' 
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => <Icon name={routeIcon[route.name]} size={size} color={color}/>
                })}
            >
                <Tab.Screen name='Feed' component={Feed} />
                <Tab.Screen name='AddPhoto' component={AddPhoto} />
                <Tab.Screen name='Profile' component={AuthOrProfile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}