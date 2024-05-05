import {
    View, Text, TextInput, Button, TouchableOpacity, ToastAndroid, StyleSheet, Image, Alert, ActivityIndicator, KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function AddPostScreen() {

    const [image, setImage] = React.useState(null);
    const db = getFirestore(app);
    // Create a root reference
    const storage = getStorage();

    //Submit button loading
    const [loading, setLoading] = React.useState(false);

    //Loggin user info
    const { user } = useUser();
    const [categoryList, setCategoryList] = React.useState([]);
    useEffect(() => {
        getCategoryList();
    }, [])


    const getCategoryList = async () => {
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, "Category"));
        querySnapshot.forEach((doc) => {
            console.log("Docs:", doc.data());
            setCategoryList(categoryList => [...categoryList, doc.data()]);
        });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmitMethod = async (value) => {
        setLoading(true);
        //Convert url
        //const resp=await fetch(value.image);
        const resp = await fetch(image);
        const blob = await resp.blob();
        const storageRef = ref(storage, '/post' + Date.now() + '.jpg');

        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).then(() => {

            getDownloadURL(storageRef).then(async (downloadUrl) => {
                console.log('File available at', downloadUrl);
                value.image = downloadUrl;
                value.userName = user.fullName;
                value.userEmail = user.primaryEmailAddress.emailAddress;
                value.userImage = user.imageUrl;

                const docRef = await addDoc(collection(db, "UserPost"), value);
                if (docRef.id) {
                    setLoading(false);
                    Alert.alert('Post enrégistré');
                    //ToastAndroid.show('Post Added Successfully', ToastAndroid.SHORT)
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
        });
    }
    return (
        <KeyboardAvoidingView>
            <ScrollView className="p-10">
                <Text className="text-[27px] font-bold">Ajouter un post</Text>
                <Text className="text-[18px] text-gray-500 mb-7">Ajouter et commencer à vendre</Text>
                <Formik
                    initialValues={{ name: '', description: '', category: '', address: '', price: '', userName: '', userEmail: '', userImage: '', createdAt: Date.now() }}
                    onSubmit={(values, { resetForm }) => {
                        onSubmitMethod(values);
                        resetForm();
                        setImage(null); // Efface l'image sélectionnée
                    }}
                    validate={(values) => {
                        const errors = {}
                        if (!values.name) {
                            errors.name = 'Name is Required';
                        }
                        return errors;
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
                        <View>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
                                {image ?
                                    <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 15 }} />
                                    : <Image source={require('./../../assets/images/placeholder1.jpg')}
                                        style={{ width: 200, height: 200, borderRadius: 15 }}
                                    />}
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder='Name'
                                value={values?.name}
                                onChangeText={handleChange('name')}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Description'
                                value={values?.description}
                                onChangeText={handleChange('description')}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Prix'
                                value={values?.price}
                                keyboardType='number-pad'
                                onChangeText={handleChange('price')}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Addresse'
                                value={values?.address}
                                onChangeText={handleChange('address')}
                            />

                            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10 }}>
                                <Picker
                                    className="border-2 border-gray-300 rounded-md p-2"
                                    selectedValue={values?.category}
                                    onValueChange={itemValue => setFieldValue('category', itemValue)}
                                >
                                    {categoryList.length > 0 && categoryList?.map((item, index) => (
                                        <Picker.Item key={index}
                                            label={item?.name} value={item?.name} />
                                    ))}
                                </Picker>
                            </View>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={{
                                    backgroundColor: loading ? '#ccc' : '#007BFF',
                                }}
                                disabled={loading}
                                className="p-4 mt-6 bg-blue-500 rounded-full">
                                {loading ?
                                    <ActivityIndicator size="small" color="#fff" />
                                    :
                                    <Text className="text-white text-center text-[16px] ">Enregistrer</Text>
                                }

                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingTop: 15,
        marginTop: 10,
        marginBottom: 5,
        paddingHorizontal: 17,
        fontSize: 17,
        textAlignVertical: 'top'
    }
})
