import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, Share, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { deleteDoc, query, collection, getDocs, where } from 'firebase/firestore';
import Mail from 'react-native-mail';

export default function ProductDetails() {
    const { params } = useRoute();
    const { user } = useUser();
    const navigation = useNavigation();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (params) {
            setProduct(params.product);
            shareButton();
        }
    }, [params]);

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="share-social-sharp" size={24} color="white" style={{ marginRight: 15 }} onPress={shareProduct} />
            ),
        });
    }

    const shareProduct = async () => {
        const content = {
            message: product?.name + "\n" + product?.description + "\n" + product?.price + "€"
        }
        try {
            const result = await Share.share(content);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUserPost = () => {
        Alert.alert('Supprimer le post', 'Voulez-vous vraiment supprimer ce post?', [
            {
                text: 'Oui',
                onPress: deleteFromFirestore
            },
            {
                text: 'Annuler',
                onPress: () => console.log('Annuler'),
                style: 'cancel',
            }
        ]);
    }

    const deleteFromFirestore = async () => {
        const q = query(collection(db, "UserPost"), where("name", "==", product?.name));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            deleteDoc(doc.ref)
                .then(() => {
                    console.log('Document successfully deleted!');
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error('Error removing document: ', error);
                });
        });
    }

    const sendEmailMessage = () => {
        const subject = 'Hello';
        const body = `
            <html>
                <body>
                    <p>Hello, I am interested in your product. Please provide me more details.</p>
                    <p>Thanks</p>
                </body>
            </html>
        `;
        const recipients = [product?.userEmail];
        Mail.mail({
            subject,
            recipients,
            body,
            isHTML: true,
        }, (error) => {
            if (error) {
                console.error('Failed to open email:', error);
            }
        });
    }


    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Image source={{ uri: product?.image }} style={{ height: 320, width: '100%' }} />
            <View style={{ padding: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{product?.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 10 }}>
                    <Text style={{ padding: 5, paddingHorizontal: 10, backgroundColor: 'blue', borderRadius: 20, color: 'white' }}>{product?.category}</Text>
                </View>
                <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 20 }}>Description</Text>
                <Text style={{ fontSize: 17, color: 'gray' }}>{product?.description}</Text>
            </View>
            <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightblue' }}>
                <Image source={{ uri: product?.userImage }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{product?.userName}</Text>
                    <Text style={{ color: 'gray' }}>{product?.userEmail}</Text>
                </View>
            </View>
            {user?.primaryEmailAddress?.emailAddress === product?.userEmail ?
                <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 20, padding: 10, margin: 10 }}
                    onPress={deleteUserPost}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Supprimer ce post</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius: 20, padding: 10, margin: 10 }}
                    onPress={sendEmailMessage}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Envoyer un Message</Text>
                </TouchableOpacity>
            }
        </ScrollView>
    );
}
