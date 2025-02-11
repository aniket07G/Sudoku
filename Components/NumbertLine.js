import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from "react-redux";

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const NumberLine = (props) => {

    const [selectedNumber, setselectedNumber] = useState(null);
    const Nline = [1, 2, 3, 4, 5, 6, 7, 8, 9,];
    const reduxData = useSelector((state) => state.reducer);

    useEffect(() => {
        if (props.isRestart.yesRestart === true) {
            setselectedNumber(null);
            props.onDataUpdate({});
        }
    }, [props.isRestart.initiate]);

    const handelpress = (number) => {
        if (number === selectedNumber) {
            setselectedNumber(number);
        } else {
            setselectedNumber(number);
        }
        props.onDataUpdate({ invoker: getRandomNumber(1, 1000), data: number });
    }

    return (
        <View style={[styles.container,
        reduxData.dataToggleIcon && styles.darkElementOuter,
        !reduxData.dataMarginSetting && {padding: 0, borderWidth: 1.5}]}>
            {Nline.map((num, index) => (
                <TouchableOpacity key={index} style={[styles.numberButton,
                selectedNumber === num && (!reduxData.dataToggleIcon ? styles.selectedNumber : styles.selectedNumberDark),
                reduxData.dataToggleIcon && styles.darkElement,
                !reduxData.dataMarginSetting && {margin: 0, borderWidth: 1}
                ]} activeOpacity={!reduxData.dataMarginSetting ? 0.6 : 0.2} onPress={() => handelpress(num)}>
                    <Text style={[styles.numberText, reduxData.dataToggleIcon && styles.numberTextDark]}> {num} </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        padding: 1,
        marginBottom: 0,
        backgroundColor: '#FFFFFF'
    },
    numberButton: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'lightblue',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
    },
    numberText: {
        // fontSize: 30,
        fontSize: windowWidth * 0.074,
        fontWeight: '100',
        fontFamily: 'Arial',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        color: 'black',
    },
    selectedNumber: {
        // backgroundColor: 'transperent',
        borderColor: 'blue'
    },
    darkElementOuter: {
        backgroundColor: '#2A2F42'
    },
    darkElement: {
        backgroundColor: '#232532'
    },
    numberTextDark: {
        color: '#7285F5'
    },
    selectedNumberDark: {
        // borderColor: '#008080'
        borderColor: '#6A5ACD'
    }
}
)

export default NumberLine;