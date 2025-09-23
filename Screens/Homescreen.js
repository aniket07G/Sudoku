import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import SettingIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { CompletionAnimationSetting, HighlightSameNumberSetting, HintSettingAction, MarginSettingAction, MistakeSettingAction, RegionHighlightSetting, TimerSettingAction, ToggleIconAction, VibrationSettingAction } from '../Components/redux/action';
import { useSelector } from 'react-redux';

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
console.log("hight", windowHight, "width", windowWidth);
console.log("ok");
let value = null;

const Homescreen = (props) => {

    const reduxData = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('toggle-key');
            if (value !== null) {
                console.log("Retrieved value: ", value);
                if (value === 'true') {
                    dispatch(ToggleIconAction(true));
                } else {
                    dispatch(ToggleIconAction(false));
                }
            } else {
                dispatch(ToggleIconAction(false));
            }

            const margin = await AsyncStorage.getItem('margin-key');
            if (margin !== null) {
                if (margin === 'true') {
                    dispatch(MarginSettingAction(true));
                } else {
                    dispatch(MarginSettingAction(false));
                }
            } else {
                dispatch(MarginSettingAction(false));
            }

            const timer = await AsyncStorage.getItem('timer-key');
            if (timer !== null) {
                if (timer === 'true') {
                    dispatch(TimerSettingAction(true));
                } else {
                    dispatch(TimerSettingAction(false));
                }
            } else {
                dispatch(TimerSettingAction(true));
            }

            const mistakelimit = await AsyncStorage.getItem('mistakelimit-key');
            if (mistakelimit !== null) {
                if (mistakelimit === 'true') {
                    dispatch(MistakeSettingAction(true));
                } else {
                    dispatch(MistakeSettingAction(false));
                }
            } else {
                dispatch(MistakeSettingAction(true));
            }

            const hintlimit = await AsyncStorage.getItem('hintlimit-key');
            if (hintlimit !== null) {
                if (hintlimit === 'true') {
                    dispatch(HintSettingAction(true));
                } else {
                    dispatch(HintSettingAction(false));
                }
            } else {
                dispatch(HintSettingAction(true));
            }

            const completionanimation = await AsyncStorage.getItem('completionanimation-key');
            if (completionanimation !== null) {
                if (completionanimation === 'true') {
                    dispatch(CompletionAnimationSetting(true));
                } else {
                    dispatch(CompletionAnimationSetting(false));
                }
            } else {
                dispatch(CompletionAnimationSetting(true));
            }

            const highlightsame = await AsyncStorage.getItem('highlightsame-key');
            if (highlightsame !== null) {
                if (highlightsame === 'true') {
                    dispatch(HighlightSameNumberSetting(true));
                } else {
                    dispatch(HighlightSameNumberSetting(false));
                }
            } else {
                dispatch(HighlightSameNumberSetting(true));
            }

            const regionhighlight = await AsyncStorage.getItem('regionhighlight-key');
            if (regionhighlight !== null) {
                if (regionhighlight === 'true') {
                    dispatch(RegionHighlightSetting(true));
                } else {
                    dispatch(RegionHighlightSetting(false));
                }
            } else {
                dispatch(RegionHighlightSetting(true));
            }

            const vibtrate = await AsyncStorage.getItem('vibrationsetting-key');
            if (vibtrate !== null) {
                if (vibtrate === 'true') {
                    dispatch(VibrationSettingAction(true));
                } else {
                    dispatch(VibrationSettingAction(false));
                }
            } else {
                dispatch(VibrationSettingAction(true));
            }
        } catch (error) {
            console.error("Error getting data: ", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={[styles.container, reduxData.dataToggleIcon && styles.backgroundColorDark]}>
            <View style={styles.outerHome}>
                <TouchableOpacity style={styles.settingIcon} onPress={() => props.navigation.navigate('Settings')}>
                    <SettingIcon name='settings-outline' size={windowWidth * 0.1} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                </TouchableOpacity>
                <View style={[styles.home, reduxData.dataToggleIcon && styles.darkElement]}>
                    <Icon name='home' size={windowWidth * 0.1 + 10} color='#317AE8' />
                </View>
            </View>
            <View style={styles.sudoku}>
                <Text style={[styles.sudokuText, reduxData.dataToggleIcon && styles.textDarkSudoku]}>SUDOKU</Text>
                <Text style={[styles.Game, reduxData.dataToggleIcon && styles.textDarkGame]}>GAME</Text>
            </View>
            <View style={styles.outerMainview}>
                <View style={[styles.mainview, reduxData.dataToggleIcon && styles.darkElement]}>
                    <TouchableOpacity style={styles.buttonStart} onPress={() => props.navigation.navigate('Mode')}>
                        <Icon name='controller-play' size={windowWidth * 0.14} color='#FFFFFF' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAbout} onPress={() => props.navigation.navigate('About')}>
                        <Text style={styles.text}>About</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainview: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: windowHight * 0.3 - 5,
        width: windowWidth * 0.8,
        borderRadius: 60,
        borderColor: '#317AE8',
        borderWidth: 1,

    },
    buttonStart: {
        backgroundColor: '#317AE8',
        height: windowHight * 0.11,
        width: windowWidth * 0.8 - 50,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        borderRadius: 50,
        borderColor: '#317AE8',
        borderWidth: 2,

    },
    buttonAbout: {
        backgroundColor: '#317AE8',
        height: windowHight * 0.11,
        width: windowWidth * 0.8 - 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        marginTop: windowWidth * 0.03 - 1,
        borderRadius: 50,
        borderColor: '#317AE8',
        borderWidth: 2,
    },
    text: {
        fontSize: windowWidth * 0.12,
        fontFamily: 'Poppins-Medium',
        includeFontPadding: false,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#ffffffff',
    },
    outerHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth

    },
    outerMainview: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth

    },
    home: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: windowWidth * 0.04,
        borderRadius: 40,
        width: windowWidth * 0.3 - 20,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        elevation: 2,
        marginTop: windowHight * 0.05
    },
    sudoku: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: windowWidth * 0.02,
        width: windowWidth,
        // backgroundColor: 'blue'
    },
    sudokuText: {
        fontSize: windowWidth * 0.2,
        fontFamily: 'Poppins-Bold',
        color: '#1A237E',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        letterSpacing: -5,
        marginTop: windowHight * 0.04

    },
    Game: {
        fontSize: windowWidth * 0.12,
        fontFamily: 'Poppins-Bold',
        color: '#1565C0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: - windowWidth * 0.12,
        letterSpacing: -3,
        marginBottom: windowHight * 0.09,
    },
    settingIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
        position: 'absolute',
        zIndex: 2,
        left: windowWidth * 0.035,
        top: windowWidth * 0.035,
        // width: windowWidth * 0.14,
        // height: windowWidth * 0.14,
        // borderRadius: windowWidth * 0.14 / 2
    },
    backgroundColorDark: {
        backgroundColor: '#0E0D13'
    },
    darkElement: {
        backgroundColor: '#222431',
        borderColor: '#323440'
    },
    textDark: {
        color: '#9CABBE'
    },
    textDarkSudoku: {
        color: '#E3F2FD',  
    },
    textDarkGame: {
        color: '#90CAF9',  
    },
})

export default Homescreen;