import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, orderBy } from 'firebase/firestore';
import Categories from '../Components/HomeScreen/Categories';
import LatestItemList from '../Components/HomeScreen/LatestItemList';


export default function HomeScreen() {
    const db = getFirestore();
    const [sliders, setSliders] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [latestItemList, setlatestItemList] = useState([]);

    useEffect(() => {
        getSliders();
        getCategoryList();
        getLatestItemList();
    }, [])

    // getSliders for home
    const getSliders = async()=>{
        setSliders([]);
        const querySnapshot = await getDocs(collection(db, "Sliders"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setSliders(sliders => [...sliders, doc.data()]);
        });

    }

    //Categorie
    const getCategoryList = async () => {
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, "Category"));
        querySnapshot.forEach((doc) => {
            console.log("Docs:", doc.data());
            setCategoryList([...categoryList, doc.data()]);
        });
    }

    //Latest Item List
    const getLatestItemList=async()=>{
        setlatestItemList([]);
        const querySnapshot = await getDocs(collection(db, "UserPost"), orderBy("createdAt", "desc"));
        querySnapshot.forEach((doc) => {
            console.log("Docs:", doc.data());
            setlatestItemList([...latestItemList, doc.data()]);
        });
    }

    return (
        <ScrollView className="py-8 px-6 mt-1 bg-white flex-1" nestedScrollEnabled={true}>
            <Header>
            </Header>
            <Slider sliders={sliders}>
            </Slider>
            <Categories categoryList={categoryList}></Categories>
            <LatestItemList latestItemList={latestItemList}></LatestItemList>
        </ScrollView>
    )
}