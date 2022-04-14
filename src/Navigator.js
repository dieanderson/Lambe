import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'

const Tab = createBottomTabNavigator()

const MenuNavigator = () => {
    
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Feed' screenOptions={{headerShown: false}}>
                <Tab.Screen name='Feed' component={Feed} 
                    options={{
                        title:'Feed',
                        tabBarIcon: ({color}) => <Icon name='home' size={30} color={color}/>,
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen name='AddPhoto' component={AddPhoto} 
                    options={{
                        title:'AddPicture',
                        tabBarIcon: ({color}) => <Icon name='camera' size={30} color={color}/>,
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen name='Profile' component={Feed} 
                    options={{
                        title:'Profile',
                        tabBarIcon: ({color}) => <Icon name='user' size={30} color={color}/>,
                        tabBarShowLabel: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MenuNavigator