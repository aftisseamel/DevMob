import { View, FlatList, Image} from 'react-native';
import React from 'react';

export default function Slider({sliders}) {

    return (
        <View className="mt-5">
            <FlatList
            data={sliders}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
                <View>
                    <Image source={{uri: item?.image}} 
                    className="h-[200px] w-[330px] mr-3 rounded-lg
                    object-contain"
                    />
                </View>
            )}
            />
        </View>
    )
}