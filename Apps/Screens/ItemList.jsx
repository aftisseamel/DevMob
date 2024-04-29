import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { app } from '../../firebaseConfig';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList() {

    const { params } = useRoute();
    const db = getFirestore(app);
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        params && getItemListByCategory
        //console.log(params.category)
    }, [params])

    const getItemListByCategory = async()=> {
        setItemList([]);
        setLoading(true);
        const q = query(collection(db, "UserPost"), where("category", "==", params.category));
        const snapshot = await getDocs(q);
        setLoading(false);
        snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            setItemList(itemList => [...itemList, doc.data()]);
        })
    }
    return (
        <View className="p-2">
            {loading?
            <ActivityIndicator size="large" color="#0000ff" />   
            :
            itemList?.length > 0 ?
                <LatestItemList latestItemList={itemList} heading={''} />
                : <Text className="p-5 text-[20px} mt-24 justify-center text-center text-gray-400">Aucun post</Text>
            }
        </View>
    )
}