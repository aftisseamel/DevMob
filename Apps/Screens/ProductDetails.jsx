import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Linking, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, query, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ProductDetails() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const { user } = useUser();
    const [product, setProduct] = useState(params?.product || {});

    useEffect(() => {
        if (params?.product) {
            setProduct(params.product);
        }
    }, [params]);

    const shareProduct = () => {
        const content = {
            message: `${product?.name}\n${product?.description}\n${product?.price}€`
        };
        Share.share(content)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    };

    const deleteUserPost = () => {
        Alert.alert('Supprimer le post', 'Voulez-vous vraiment supprimer ce post?', [
            {
                text: 'Oui',
                onPress: deleteFromFirestore
            },
            {
                text: 'Annuler',
                onPress: () => console.log('Annuler'),
                style: 'cancel'
            }
        ]);
    };

    const deleteFromFirestore = async () => {
        const q = query(collection(db, 'UserPost'), where('name', '==', product?.name));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            deleteDoc(doc.ref)
                .then(() => {
                    console.log('Document successfully deleted!');
                    navigation.goBack();
                })
                .catch(error => {
                    console.error('Error removing document: ', error);
                });
        });
    };

    const sendEmailMessage = () => {
        const subject = 'Hello';
        const body = 'Hello, I am interested in your product. Please provide me more details. Thanks';
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        Linking.openURL(`mailto:${product?.userEmail}?subject=${encodedSubject}&body=${encodedBody}`);
        console.log("j'ai cliqué sur : Envoyer un Message");
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Image source={{ uri: product?.image }} style={{ height: 320, width: '100%' }} />
            <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{product?.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ padding: 10, paddingHorizontal: 20, marginTop: 20, backgroundColor: 'blue', borderRadius: 50, color: 'white' }}>{product?.category}</Text>
                </View>
                <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>Description</Text>
                <Text style={{ fontSize: 17, color: '#888' }}>{product?.description}</Text>
            </View>
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: 'blue' }}>
                <Image source={{ uri: product?.userImage }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{product?.userName}</Text>
                    <Text style={{ color: 'white' }}>{product?.userEmail}</Text>
                </View>
            </View>
            {user?.primaryEmailAddress?.emailAddress === product?.userEmail ?
                <TouchableOpacity style={{ zIndex: 40, backgroundColor: 'red', borderRadius: 50, padding: 10, margin: 10 }} onPress={deleteUserPost}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Supprimer ce post</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ zIndex: 40, backgroundColor: 'blue', borderRadius: 50, padding: 10, margin: 10 }} onPress={sendEmailMessage} >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Envoyer un Message</Text>
                    <Text> </Text>
                </TouchableOpacity>
            }
         </ScrollView>
    );
}
