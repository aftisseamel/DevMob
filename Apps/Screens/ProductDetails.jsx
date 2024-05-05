import { View, Text, Image, ScrollView, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function ProductDetail({navigation}) {
    const {params}=useRoute();
    const [product,setProduct]=useState([]);
    const {user}=useUser();
    const db=getFirestore(app);
    const nav=useNavigation();
    useEffect(()=>{
        params&&setProduct(params.product);
        shareButton();
    },[params,navigation])

    const shareButton=()=>{
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="share-social-sharp" size={24} 
                onPress={()=>shareProduct()}
                color="white"
                style={{marginRight:15}} />
                
            ),
          });
      
    }

    /**
     * Used to Share Product
     */
    const shareProduct=async()=>{
        const content={
            message:product?.name+"\n"+product?.desc,
        }

       Share.share(content).then(resp=>{
        console.log(resp);
       },(error)=>{
        console.log(error);
       })
    }

    const sendEmailMessage=()=>{
        const subject='Votre article sur le LeVraiCoin'+product.name;
        const body="Salut "+product.userName+"\n"+"Je suis interessé par votre produit";
        Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
    }

    const deleteUserPost=()=>{
        Alert.alert('Voulez vous supprimer ?',"Confirmez vous la suppression ?",[
           {
            text:'Oui',
            onPress:()=>deleteFromFirestore()
           },
           {
            text: 'Annuler',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }, 
        ])
    }
    const deleteFromFirestore=async()=>{
        console.log('Deleted');
        const q=query(collection(db,'UserPost'),where('name','==',product.name))
        const snapshot=await getDocs(q);
        snapshot.forEach(doc=>{
            deleteDoc(doc.ref).then(resp=>{
                console.log("Deleted the Doc...");
                nav.goBack();
            })
        })
    }
  return (
    <ScrollView className="bg-white">
        <Image source={{uri:product.image}}
            className="h-[320px] w-full"
        />

        <View className="m-5">
            <Text className="text-[24px] font-bold">{product?.name}</Text>
            <View className="items-baseline">
            <Text className=" bg-blue-200 p-1 mt-2 px-2 rounded-full text-blue-500">
                {product.category}
                </Text>
                </View>
            <Text className="mt-3 font-bold text-[20px]">Description</Text>
            <Text className="text-[17px] text-gray-500">{product?.description}</Text>
        </View>

    {/* User Info  */}
        <View className="p-3 flex flex-row items-center gap-3 bg-blue-100  border-gray-400">
            <Image source={{uri:product.userImage}}
                className="w-12 h-12 rounded-full"
            />
            <View >
                <Text className="font-bold text-[18px]">{product.userName}</Text>
                <Text className="text-gray-500">{product.userEmail}</Text>
            </View>
        </View>
       
       {user?.primaryEmailAddress.emailAddress==product.userEmail?
         <TouchableOpacity
         onPress={()=>deleteUserPost()}
         className=" z-40  bg-red-500 rounded-full  p-4 m-8">
             <Text className="text-center text-white">Supprimer</Text>
         </TouchableOpacity>
         :
         <TouchableOpacity
         onPress={()=>sendEmailMessage()}
         className=" z-40  bg-blue-500 rounded-full p-4 m-8">
             <Text className="text-center text-white">Contacter</Text>
         </TouchableOpacity>
        }
       
    
    </ScrollView>
  )
}