import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStacknav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScrenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {

    return (
        <Tab.Navigator className="mt-5" screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="Home" component={HomeScreenStacknav}
                options={{
                    tabBarLabel: ({ color }) =>
                        (<Text style={{ color: color, fontSize: 12, marginTop: 3, marginBottom: 3 }}>Accueil</Text>),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Explore" component={ExploreScreenStackNav}
                options={{
                    tabBarLabel: ({ color }) =>
                        (<Text style={{ color: color, fontSize: 12, marginTop: 3, marginBottom: 3 }}>Explorer</Text>),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-sharp" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="AddPost" component={AddPostScreen}
                options={{
                    tabBarLabel: ({ color }) =>
                        (<Text style={{ color: color, fontSize: 12, marginTop: 3, marginBottom: 3 }}>Post</Text>),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="camera" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreenStackNav}
                options={{
                    tabBarLabel: ({ color }) =>
                        (<Text style={{ color: color, fontSize: 12, marginTop: 3, marginBottom: 3 }}>Profil</Text>),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}