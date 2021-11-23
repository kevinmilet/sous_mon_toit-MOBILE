import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Customer from "../screens/Customer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign, FontAwesome5} from '@expo/vector-icons'
import Estate from "../screens/Estate";
import Contract from "../screens/Contract";


const Tab = createBottomTabNavigator();


const NavigationMain = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="home" options={{
                   headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color="black" size={24} />
                    ),
                }} >
                
                    {()=><Home/>}
                    
                </Tab.Screen>
                <Tab.Screen name="customer" ame="home" options={{
                    headerShown: false,
                    tabBarLabel: 'Clients',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="profile" size={24} color="black" />
                     ),
                }}>

                {()=><Customer/>}

                </Tab.Screen>
                <Tab.Screen name="estate" options={{
                    headerShown: false,
                    tabBarLabel: 'Biens',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-modern" size={24} color="black" />
                    ),
                }} >
                
                    {()=><Estate/>}
                    
                </Tab.Screen>
                <Tab.Screen name="contract" options={{
                    headerShown: false,
                    tabBarLabel: 'Contrats',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="file-contract" size={24} color="black" />
                    ),
                }} >
                
                    {()=><Contract/>}
                    
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}

export default NavigationMain