import { View, Text, Image, TouchableOpacity, Linking, Share, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { deleteDoc, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
export default function ProductDetails({ navigation }) {

    const { params } = useRoute();
    const { product, setProduct } = useState([]);
    const { user } = useUser();
    //const navigation = useNavigation();
    console.log(params.product)
    useEffect(() => {
        params && setProduct(params.product);
        shareButton();
    }, [params, navigation])

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="share-social-sharp" size={24} color="white"
                    style={{ marginRight: 15 }}
                    onPress={() => shareProduct()}
                />
            ),
        });
    }
    const shareProduct = async () => {
        const content = {
            message: product?.name + "\n" + product?.description + "\n" + product?.price + "£"
        }
        Share.share(content).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteUserPost = () => {
        Alert.alert('Supprimer le post', 'Voulez-vous vraiment supprimer ce post?', [
            {
                text: 'Oui',
                onPress: () => deleteFromFirestore()
            },
            {
                text: 'Annuler',
                onPress: () => console.log('Annuler'),
                style: 'cancel',
            }
        ])
    }

    const deleteFromFirestore = async () => {
        const q = query(collection(db, "UserPost"), where("name", "==", product?.name));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            deleteDoc(doc.ref).then(() => {
                console.log('Document successfully deleted!');
                navigation.goBack();
            }).catch((error) => {
                console.error('Error removing document: ', error);
            });
        })
    }

    const sendEmailMessage = () => {
        Linking.openURL('mailto:' + product?.userEmail + '?subject=Hello&body=Hello, I am interested in your product. Please provide me more details. Thanks')
    }
    return (
        <ScrollView className="bg-white">
            <Image source={{ uri: product?.image }}
                className="h-[320px] w-full"
            />
            <View className="p-3">
                <Text className="font-bold text-[24px]">{product?.name}</Text>
                <View className="items-baseline">
                    <Text className="p-1 px-2 mt-2 bg-blue-200 rounded-full">{product?.category}</Text>
                </View>
                <Text className="mt-3 font-bold text-[20px]">Description</Text>
                <Text className="text-[17px] text-gray-500">{product?.description}</Text>
            </View>
            <View className="p-3 flex flex-row items-center gap-3 bg-blue-100">
                <Image source={{ uri: product?.userImage }}
                    className="w-12 h-12 rounded-full"
                />
                <View className="">
                    <Text className="font-bold text-[18px]">{product?.userName}</Text>
                    <Text className="text-gray-500">{product?.userEmail}</Text>
                </View>
            </View>
            {user?.primaryEmailAddress?.emailAddress === product?.userEmail ?
                <TouchableOpacity className="z-40 bg-red-500  rounded-full p-3 m-2"
                    onPress={() => deleteUserPost()}
                >
                    <Text className="text-center text-white">Supprimer ce post</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity className="z-40 bg-blue-500  rounded-full p-3 m-2"
                    onPress={() => sendEmailMessage()}
                >
                    <Text className="text-center text-white">Envoyer un Message</Text>
                </TouchableOpacity>
            }

        </ScrollView>
    )

}