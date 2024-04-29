import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PostItem({ item}) {

    const navigation = useNavigation();
    return (
        <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
        onPress={()=>navigation.push('ProductDetails',
    
        {
            product : item
        }
    )}
        >
            <Image source={{ uri: item?.image }}
                className="w-full h-[140px] rounded-lg"
            />
            <View>
                <Text className="text*blue-500 bg-blue-200 mt-1 p-1 
                        rounded-full px-2 text-[12px] w-[80px] text-center">{item.category}</Text>
                <Text className="font-bold text-[15px] mt-2">{item.name}</Text>
                <Text className="font-bold text-[20px] text-blue-500">{item.price} £</Text>
            </View>
        </TouchableOpacity>
    )
}