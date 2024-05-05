import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList'

export default function ExploreScreen() {

    const db = getFirestore(app)
    const [productList, setproductList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await Promise.all([getAllProducts()]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //         setRefreshing(false);
    //         // faire des choses
    //     }, 1000);
    // }, []);

    useEffect(() => {
        getAllProducts();
    }, [])
    /**
     * Used to get All Products
     */
    const getAllProducts = async () => {
        setproductList([]);
        const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));

        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            setproductList(productList => [...productList, doc.data()]);
        })
    }
    return (
        <ScrollView className="p-5 py-8 bg-white"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text className="text-[30px] font-bold">Voir plus</Text>
            <LatestItemList latestItemList={productList} />
        </ScrollView>
    )
}