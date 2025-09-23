import React, { version } from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Linking } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import SettingToggle from 'react-native-vector-icons/FontAwesome';
import VibrationIcon from 'react-native-vector-icons/MaterialIcons'
import TimerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MistakeIcon from 'react-native-vector-icons/Entypo';
import HintIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckIcon from 'react-native-vector-icons/Ionicons'
import FeedbackIcon from 'react-native-vector-icons/Ionicons';
import HighlighterIcon from 'react-native-vector-icons/FontAwesome6';
import NumberIcon from 'react-native-vector-icons/Octicons';
import MarginIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompletionAnimationSetting, HighlightSameNumberSetting, HintSettingAction, MarginSettingAction, MistakeSettingAction, RegionHighlightSetting, TimerSettingAction, VibrationSettingAction } from "../Components/redux/action";


const windowWidth = Dimensions.get('window').width;
const windowHight = Dimensions.get('window').height;


const Settingsscreen = (props) => {

    const reduxData = useSelector((state) => state.reducer);
    dispatch = useDispatch();

    const handleMarginToggle = async (data) => {
        if (data) {
            dispatch(MarginSettingAction(data));
            try {
                await AsyncStorage.setItem('margin-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(MarginSettingAction(data));
            try {
                await AsyncStorage.setItem('margin-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleTimer = async (data) => {
        if (data) {
            dispatch(TimerSettingAction(data));
            try {
                await AsyncStorage.setItem('timer-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(TimerSettingAction(data));
            try {
                await AsyncStorage.setItem('timer-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleMistakeLimit = async (data) => {
        if (data) {
            dispatch(MistakeSettingAction(data));
            try {
                await AsyncStorage.setItem('mistakelimit-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(MistakeSettingAction(data));
            try {
                await AsyncStorage.setItem('mistakelimit-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleHintLimit = async (data) => {
        if (data) {
            dispatch(HintSettingAction(data));
            try {
                await AsyncStorage.setItem('hintlimit-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(HintSettingAction(data));
            try {
                await AsyncStorage.setItem('hintlimit-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleCompletionAnimation = async (data) => {
        if (data) {
            dispatch(CompletionAnimationSetting(data));
            try {
                await AsyncStorage.setItem('completionanimation-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(CompletionAnimationSetting(data));
            try {
                await AsyncStorage.setItem('completionanimation-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleHighlightSameNumber = async (data) => {
        if (data) {
            dispatch(HighlightSameNumberSetting(data));
            try {
                await AsyncStorage.setItem('highlightsame-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(HighlightSameNumberSetting(data));
            try {
                await AsyncStorage.setItem('highlightsame-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleRegionHighlight = async (data) => {
        if (data) {
            dispatch(RegionHighlightSetting(data));
            try {
                await AsyncStorage.setItem('regionhighlight-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(RegionHighlightSetting(data));
            try {
                await AsyncStorage.setItem('regionhighlight-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleVibration = async (data) => {
        if (data) {
            dispatch(VibrationSettingAction(data));
            try {
                await AsyncStorage.setItem('vibrationsetting-key', 'true');
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(VibrationSettingAction(data));
            try {
                await AsyncStorage.setItem('vibrationsetting-key', 'false');
            } catch (error) {
                console.log(error);
            }
        }
        console.log("what", reduxData.dataVibrationSetting);
    }

    const handleFeedback = () => {
        const email = 'your-email@example.com';
        const subject = 'Feedback';
        const body = 'Hello, I would like to provide the following feedback:';
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(url).catch((err) => console.error('Error occurred', err));
    }

    return (

        <View style={styles.container}>
            <View style={[styles.header, reduxData.dataToggleIcon && styles.darkBackground]}>
                <TouchableOpacity style={[styles.navigateBack, reduxData.dataToggleIcon && styles.darkElement]} onPress={() => props.navigation.navigate('Home')}>
                    <Icons name='arrow-back-circle-outline' size={windowWidth * 0.11} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.textSetting, { lineHeight: windowWidth * 0.1, fontFamily: 'Poppins-SemiBold' }, reduxData.dataToggleIcon && styles.textInDark]}> Settings </Text>
                </View>
            </View>
            <View style={[styles.settingsContainer, reduxData.dataToggleIcon && styles.darkBackground]}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} alwaysBounceVertical={false} overScrollMode="never" >
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <MarginIcon name='grid-large' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, {lineHeight: windowWidth * 0.09}]}> Margin </Text>
                            <Text style={[styles.extraText, reduxData.dataToggleIcon && styles.darkText]}>Space Between Cells</Text>
                        </View>
                        {reduxData.dataMarginSetting ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleMarginToggle(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleMarginToggle(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <TimerIcon name='timer-outline' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, {lineHeight: windowWidth * 0.09}]}> Timer </Text>
                        </View>
                        {reduxData.dataTimerSetting ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleTimer(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleTimer(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <VibrationIcon name='vibration' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, {lineHeight: windowWidth * 0.09}]}> Vibrate </Text>
                        </View>
                        {reduxData.dataVibrationSetting ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleVibration(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleVibration(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <MistakeIcon name='circle-with-cross' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, {lineHeight: windowWidth * 0.09}]}> Mistake Limit </Text>
                        </View>
                        {reduxData.dataMistakeSetting ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleMistakeLimit(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleMistakeLimit(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <HintIcon name='lightbulb-on-outline' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, {lineHeight: windowWidth * 0.09}]}> Hint Limit </Text>
                        </View>
                        {reduxData.dataHintSetting ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleHintLimit(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleHintLimit(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <CheckIcon name='checkmark-circle-outline' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, { fontSize: windowWidth * 0.045 }]}> Completion Animation </Text>
                            <Text style={[styles.extraText, reduxData.dataToggleIcon && styles.darkText]}>A blink animation displays when any row, coloumn and box is completed  </Text>
                        </View>
                        {reduxData.dataCompletionAnimationSetting ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleCompletionAnimation(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleCompletionAnimation(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <NumberIcon name='number' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, { fontSize: windowWidth * 0.04 }]}> Highlight Same Numbers </Text>
                            <Text style={[styles.extraText, reduxData.dataToggleIcon && styles.darkText, { fontSize: windowWidth * 0.028 }]}>When a number is selected, all the cells with the same numbers get highlighted </Text>
                        </View>
                        {reduxData.dataHighlightSameNumber ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleHighlightSameNumber(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleHighlightSameNumber(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                        <View style={styles.icons}>
                            <HighlighterIcon name='highlighter' size={windowWidth * 0.07} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, { fontSize: windowWidth * 0.047 }]}> Region Highlight </Text>
                            <Text style={[styles.extraText, reduxData.dataToggleIcon && styles.darkText, { fontSize: windowWidth * 0.028 }]}>Highlight the row, column, block of selected cell</Text>
                        </View>
                        {reduxData.dataRegionHighlightSetting ? (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleRegionHighlight(false)}>
                                    <SettingToggle name='toggle-on' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.toggle} onPress={() => handleRegionHighlight(true)}>
                                    <SettingToggle name='toggle-off' size={windowWidth * 0.13} color={!reduxData.dataToggleIcon ? 'blue' : 'white'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <TouchableOpacity style={[styles.settingsSection, reduxData.dataToggleIcon && styles.darkBackground, reduxData.dataToggleIcon && styles.headerbottomDark]} onPress={() => handleFeedback()}>
                        <View style={styles.icons}>
                            <FeedbackIcon name='mail-outline' size={windowWidth * 0.09} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </View>
                        <View style={styles.textArea}>
                            <Text style={[styles.settingText, reduxData.dataToggleIcon && styles.textInDark, {lineHeight: windowWidth * 0.09}]}> Feedback </Text>
                        </View>
                        <TouchableOpacity style={styles.toggle}>
                            {/* <SettingToggle name='toggle-on' size={windowWidth * 0.13} color='blue' /> */}
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={[styles.bottomSection]}>
                        <Text style={[styles.versionText]}>Version 1.0</Text>
                    </View>
                </ScrollView>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomWidth: 2,
        // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        paddingLeft: windowWidth * 0.03,
        width: windowWidth,
        height: windowHight * 0.09,
        // backgroundColor: 'orange'
    },
    navigateBack: {
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (windowWidth * 0.11) / 2,
        backgroundColor: '#FFFFFF'
    },
    settingsContainer: {
        flex: 9,
        alignItems: 'center',
    },
    settingsSection: {
        width: windowWidth,
        height: windowHight * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#FFFFFF'
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    icons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: windowWidth * 0.01
    },
    textArea: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    settingText: {
        fontSize: windowWidth * 0.06,
        lineHeight: windowWidth * 0.06,
        fontFamily: 'Poppins-Regular',
        color: 'black',
        includeFontPadding: false,
    },
    extraText: {
        fontSize: windowWidth * 0.03,
        marginLeft: windowWidth * 0.02,
        color: '#6F6F6F',
        fontFamily: 'Poppins-Light',
        lineHeight: windowWidth * 0.031,
        includeFontPadding: false,
    },
    textSetting: {
        fontSize: windowWidth * 0.075,
        fontWeight: '500',
        marginLeft: 4,
        color: 'black'
    },
    toggle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: windowWidth * 0.04
    },
    darkBackground: {
        backgroundColor: '#15181F'
    },
    textInDark: {
        color: 'white'
    },
    darkElement: {
        backgroundColor: '#222431',
    },
    darkText: {
        color: '#7E7F91'
    },
    headerbottomDark: {
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    bottomSection: {
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth,
        height: windowHight * 0.15
    },
    versionText: {
        fontSize: windowWidth * 0.05,
        color: '#6F6F6F',
        fontFamily: 'Poppins-Regular'
    }
})

export default Settingsscreen;

