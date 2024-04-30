import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import { getFirestore, collection, getDocs, orderBy } from 'firebase/firestore';
import Categories from '../Components/HomeScreen/Categories';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function HomeScreen() {
    const db = getFirestore();
    const [sliders, setSliders] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [latestItemList, setLatestItemList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getSliders();
        getCategoryList();
        getLatestItemList();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await Promise.all([getSliders(), getCategoryList(), getLatestItemList()]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const getSliders = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Sliders"));
            const slidersData = querySnapshot.docs.map(doc => doc.data());
            setSliders(slidersData);
        } catch (error) {
            console.error("Error fetching sliders:", error);
        }
    };

    const getCategoryList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Category"));
            const categoryData = querySnapshot.docs.map(doc => doc.data());
            setCategoryList(categoryData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getLatestItemList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "UserPost"), orderBy("createdAt", "desc"));
            const latestItemListData = querySnapshot.docs.map(doc => doc.data());
            setLatestItemList(latestItemListData);
        } catch (error) {
            console.error("Error fetching latest items:", error);
        }
    };

    return (
        <ScrollView
            style={styles.home}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Header />
            <Slider sliders={sliders} />
            <Categories categoryList={categoryList} />
            <LatestItemList
                latestItemList={latestItemList}
                heading={'Derniers posts'} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#F5EFEF',
        paddingTop: 8,
        paddingHorizontal: 6,
        marginTop: 40,
    },
});
