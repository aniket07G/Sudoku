import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icons2 from 'react-native-vector-icons/Feather';
import ToggleIconlight from 'react-native-vector-icons/FontAwesome'
import ToggleIconBlack from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { PauseIssueAction, StopTimerAction, ToggleIconAction } from "./redux/action";

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let isDarkMode
const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const NavigationBar = (props) => {

    const reduxData = useSelector((state) => state.reducer)
    const dispatch = useDispatch();
    const handlepress = () => {
        dispatch(PauseIssueAction(getRandomNumber(1, 200)));
        props.navigation.navigate('Mode');
    }
    const lightToggle = async () => {
        dispatch(ToggleIconAction(true));
        try {
            await AsyncStorage.setItem('toggle-key', 'true');
        } catch (error) {
            console.log('error', error)
        }
    }
    const darkToggle = async () => {
        dispatch(ToggleIconAction(false));
        try {
            await AsyncStorage.setItem('toggle-key', 'false');
        } catch (error) {
            console.log('error', error)
        }
    }
    const handleHelpIcon = ()=> {
        dispatch(StopTimerAction(true));
        props.navigation.navigate('Help');
    }

    return (
        <View style={[styles.container, reduxData.dataToggleIcon && styles.backgroundDark ]}>
            <TouchableOpacity style={[styles.leftView, reduxData.dataToggleIcon && styles.darkElement ]} onPress={() => handlepress()}>
                <Icons name='arrow-back-circle-outline' size={windowWidth * 0.11} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
            </TouchableOpacity>
            <View style={styles.toggaleContainer}>
                {!reduxData.dataToggleIcon ? (
                    <>
                        <TouchableOpacity style={styles.toggle} onPress={lightToggle} >
                            <ToggleIconlight name='toggle-off' size={windowWidth * 0.1} color='black' />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity style={[styles.toggle, reduxData.dataToggleIcon && styles.darkElement]} onPress={darkToggle} >
                            <ToggleIconBlack name='toggle-on' size={windowWidth * 0.1} color='white' />
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={[styles.rightView, reduxData.dataToggleIcon && styles.darkElement]} onPress={() => handleHelpIcon()}>
                    <Icons name='help-circle-outline' size={windowWidth * 0.11} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: windowWidth,
        height: windowHight * 0.09,
        paddingLeft: windowWidth * 0.03,
        paddingRight: windowWidth * 0.03
    },
    leftView: {
        marginRight: 'auto',
        backgroundColor: '#FFFFFF',
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (windowWidth * 0.11) / 2,

    },
    rightView: {
        marginLeft: 'auto',
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (windowWidth * 0.11) / 2,
        backgroundColor: '#FFFFFF',
    },
    toggle: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 22

    },
    toggaleContainer: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    backgroundDark: {
        backgroundColor: '#0E0D13'
    },
    darkElement: {
        backgroundColor: '#222431'
    }
})

export default NavigationBar;