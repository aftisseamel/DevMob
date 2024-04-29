import { View, Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function MyProduct() {

    const db = getFirestore(app);
    const {user} = useUser();
    const [productList, setProductList] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        user && getUserPost();
    }, [user])  

useEffect(() => {
    navigation.addListener('focus', (e) => {
        getUserPost();
    });
    }, [navigation])

    const getUserPost = async()=>{
        setProductList([]);
        const q = query(collection(db, "UserPost"), where ('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //console.log("Docs:", doc.data());
            setProductList(productList => [...productList, doc.data()]);
        }); 
    }
    return (
        <LatestItemList latestItemList={productList}/>
    )
}   