import { View, Text, TextInput, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {

    const { user } = useUser();
    return (
        <View>
            {/* User Informations */}
            <View className="flex flex-row items-center mb-5 gap-2">
                <Image source={{ uri: user?.imageUrl}}
                    className="rounded-full w-12 h-12"
                />
                <View>
                    <Text className="text-[16px]">Bienvenue</Text>
                    <Text className="text-[20px] font-bold">{user?.fullName}</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View className="p-2 px-5 bg-blue-50 rounded-full border-[1px] border-blue-300
            flex flex-row items-center gap-2">
                <Ionicons name="search" size={24}  color="gray" /> 
                <TextInput placeholder="Rechercher" className="ml-2 text-[18px]" 
                onChange={(value) => console.log(value)}
                
                />
            </View>
        </View>
    )
}