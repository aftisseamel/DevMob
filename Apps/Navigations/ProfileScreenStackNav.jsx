import { View, Text} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProduct from '../Screens/MyProduct';

export default function ProfileScreenStackNav() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="MyProduct" component={MyProduct}
                options= {{
                    headerStyle: {
                        backgroundColor: '#3b82f6',
                    },
                    headerTintColor: '#fff',
                    headerTitle : 'Mes produits'
                }}
            />
        </Stack.Navigator>
    )
}