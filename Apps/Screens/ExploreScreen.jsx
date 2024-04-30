import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ExploreScreen() {
    const db = getFirestore(app);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const q = query(collection(db, "UserPost"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const productsData = snapshot.docs.map(doc => doc.data());
                setProductList(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getAllProducts();
    }, [db]);

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>Explorer</Text>
            <LatestItemList latestItemList={productList}/>
        </ScrollView>
    );
}
