import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Splashscreen = (props) => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 100 }}>
            <View style={{ backgroundColor: '#FFFFFF', padding: 5, borderRadius: 10 }}>
                <Image style={{ height: 100, width: 100 }} source={require('../assets/pastime.png')} />
            </View>
        </View>
    )
}

export default Splashscreen;