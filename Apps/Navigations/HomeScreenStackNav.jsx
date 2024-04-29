import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetails from '../Screens/ProductDetails';

export default function HomeScreenStacknav() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="ItemList" component={ItemList}
                //options={({ route }) => console.log(route.params)}
                options={({ route }) => ({
                    title: route.params.category,
                    headerStyle: {
                        backgroundColor: '#3b82f6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            />
            <Stack.Screen name="ProductDetails" component={ProductDetails}
                //options={({ route }) => console.log(route.params)}
                options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#3b82f6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            />
        </Stack.Navigator>
    )
}