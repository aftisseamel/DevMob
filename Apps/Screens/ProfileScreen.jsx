import { View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logout2 from './../../assets/images/logout2.png';
import explore from './../../assets/images/exploration.png';
import diary from './../../assets/images/diary.png';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

    const {user} = useUser();
    const navigation = useNavigation();
    const {isLoaded, signOut} = useAuth();
    const menuList = [
        {id:1,
            name : 'Mes Posts',
            icon : diary,
            path : 'MyProduct'
        },

        {id:2,
            name : 'Explorer',
            icon : explore,
            path : 'Explore'
        },

        {id:3,
            name : 'Deconnexion',
            icon : logout2
        },
        
    ]
    const onMenuPress = (item) => {
        if(item.id === 3)
        {
            signOut();
            return;
        }
      item?.path?navigation.navigate(item.path):null;
    }
    return (
        <View className="p-5 bg-white flex-1">
            <View className="items-center mt-14">
                <Image source={{ uri: user?.imageUrl }} 
                className="w-[100px] h-[100px] rounded-full"
                />
                <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
                <Text className="text-[18px] text-gray-500 mt-2">{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
            <FlatList
                data = {menuList}
                numColumns={3}
                style={{marginTop:20}}
                renderItem={({item,index}) => (
                    <TouchableOpacity className="flex-1 p-3 border-[1px] items-center mt-4 mx-2 rounded-lg border-blue-400 bg-blue-50">
                        {item.icon&& <Image source={item?.icon}
                        onPress={()=>onMenuPress(item)}
                        className="w-[60px] h-[60px] rounded-full"
                        />}
                        <Text className="text-[12px] mt-2 text-blue-200">{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}