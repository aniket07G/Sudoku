import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Undo from 'react-native-vector-icons/MaterialCommunityIcons';
import Erase from 'react-native-vector-icons/MaterialCommunityIcons';
import Hint from 'react-native-vector-icons/MaterialCommunityIcons';
import Pause from 'react-native-vector-icons/MaterialCommunityIcons';
import Restart from 'react-native-vector-icons/MaterialCommunityIcons';
import Play from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { UndoAction, EraseAction, HintAction, PauseAction, ResumeIconAction } from "./redux/action";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withRepeat, Easing } from "react-native-reanimated";

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Features = (props) => {

    const ANGLE = 10;
    const TIME = 100;
    const EASING = Easing.elastic(1.5);
    const animationIcon = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${animationIcon.value}deg` }],
    }));

    const reduxData = useSelector((state) => state.reducer);
    const dispatch = useDispatch();
    const handleUndo = () => {
        dispatch(UndoAction(getRandomNumber(1, 1000)));
    }
    const handleErase = () => {
        dispatch(EraseAction(getRandomNumber(1, 1000)));
    }
    const handleRestart = () => {
        props.handleRestart();
    }
    const handleHint = () => {
        dispatch(HintAction(getRandomNumber(1, 1000)));
        if (reduxData.dataHintMeter === 0) {
            animationIcon.value = withSequence(
                withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
                withRepeat(
                    withTiming(ANGLE, {
                        duration: TIME,
                        easing: EASING,
                    }),
                    7,
                    true
                ),
                withTiming(0, { duration: TIME / 2, easing: EASING })
            );
        }
    }
    const handlePause = () => {
        dispatch(ResumeIconAction(true));
        dispatch(PauseAction(true));
    }

    console.log('features', reduxData.dataHintMeter);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.undo} onPress={() => handleUndo()}>
                <Undo name='undo-variant' size={windowWidth * 0.075} color={!reduxData.dataToggleIcon ? 'black' : '#7E7F91'} />
                <Text style={[styles.featuresText, reduxData.dataToggleIcon && styles.featuresTextDark]}> Undo </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.erase} onPress={() => handleErase()}>
                <Erase name='eraser' size={windowWidth * 0.075} color={!reduxData.dataToggleIcon ? 'black' : '#7E7F91'} />
                <Text style={[styles.featuresText, reduxData.dataToggleIcon && styles.featuresTextDark]}> Erase </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hint} onPress={() => handleHint()}>
                <Animated.View style={[styles.animationIconStyle, animatedStyle]}>
                    <Hint name='lightbulb-on-outline' size={windowWidth * 0.075} color={!reduxData.dataToggleIcon ? 'black' : '#7E7F91'} style={[styles.overlay]} />
                </Animated.View>
                <Text style={[styles.featuresText, styles.overlay, reduxData.dataToggleIcon && styles.featuresTextDark]}> Hint </Text>
                {reduxData.dataHintSetting && (
                    <View style={styles.hintMeter}><Text style={styles.hintMeterText}>{reduxData.dataHintMeter === undefined ? 10 : reduxData.dataHintMeter}</Text></View>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.pause} onPress={() => handlePause()}>
                {!reduxData.dataResumeIcon ? (
                    <>
                        <Pause name='pause' size={windowWidth * 0.075} color={!reduxData.dataToggleIcon ? 'black' : '#7E7F91'} />
                        <Text style={[styles.featuresText, reduxData.dataToggleIcon && styles.featuresTextDark]}> Pause </Text>
                    </>
                ) : (
                    <>
                        <Play name='play' size={windowWidth * 0.075} color={!reduxData.dataToggleIcon ? 'black' : '#7E7F91'} />
                        <Text style={[styles.featuresText, reduxData.dataToggleIcon && styles.featuresTextDark]}> Pause </Text>
                    </>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.restart} onPress={() => handleRestart()}>
                <Restart name='refresh' size={windowWidth * 0.075} color={!reduxData.dataToggleIcon ? 'black' : '#7E7F91'} />
                <Text style={[styles.featuresText, reduxData.dataToggleIcon && styles.featuresTextDark]}> Restart </Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: windowHight * 0.076,
        marginTop: -8
    },
    undo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        margin: windowWidth * 0.027,
    },
    erase: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        margin: windowWidth * 0.027,
    },
    hint: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        margin: windowWidth * 0.027,
    },
    animationIconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    hintMeter: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 2,
        width: windowWidth * 0.035,
        height: windowWidth * 0.035,
        borderRadius: (windowWidth * 0.035 + windowWidth * 0.035) / 2,
        backgroundColor: '#435DA8',
        // bottom: 16,
        bottom: windowWidth * 0.039,
        // right: 5
        right: windowHight * 0.0055


    },
    overlay: {
        zIndex: 1,
    },
    hintMeterText: {
        fontSize: windowWidth * 0.02,
        color: 'white',
        fontWeight: '400',
    },
    pause: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        margin: windowWidth * 0.027,
    },
    restart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        margin: windowWidth * 0.027,
    },
    featuresText: {
        fontSize: windowWidth * 0.035,
        fontWeight: '500',
        color: '#6F6F6F',
    },
    featuresTextDark: {
        color: '#7E7F91'
    }

})

export default Features;