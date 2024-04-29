import {Image, View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

    return (
        <View>
            <Text></Text>
            <Image source={require('./../../assets/images/home1.jpg')} 
                className="w-full h-[400px] object-cover"
            />
            <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md">
                <Text className="text-[30px] font-bold justify-center text-center">LeVraiCoin</Text>
                <TouchableOpacity onPress={onPress} className="p-3 bg-blue-500 rounded-full mt-20">
                    <Text className="text-center text-white text-[18px] font-bold">Commencer !!!</Text>
                </TouchableOpacity>
            </View>  
        </View>
    )
}