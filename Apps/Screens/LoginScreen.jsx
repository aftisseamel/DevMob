import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = async () => {
        try {
            const { createdSessionId, setActive } = await startOAuthFlow();
            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./../../assets/images/home1.jpg')}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>LeVraiCoin</Text>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Text style={styles.buttonText}>Connectez-vous</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
        backgroundColor: '#f0f0f0', // Light gray background
        marginTop: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333', // Dark gray text color
    },
    button: {
        paddingVertical: 14,
        backgroundColor: '#007BFF',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

export default LoginScreen;
