import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { StopTimerAction } from "../Components/redux/action";

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const keyPoints = `Difficulty Level:
Easy: The current difficulty level is displayed at the top of the screen, allowing users to know the level they are playing. We offer multiple difficulty levels, ranging from Easy to Expert, catering to all skill levels.

Timer:
The timer tracks the duration of your game, helping you improve your speed and challenge yourself to complete puzzles faster.

Mistake Counter:
Mistake 0/6: This counter helps you keep track of errors. You are allowed up to six mistakes per game, promoting careful thinking and accuracy.
`;

const keyPoints1 = `9x9 Grid:
The traditional Sudoku grid where you fill in numbers from 1 to 9. Some cells are pre-filled to help you get started.

Highlighting:
Selected cells and numbers are highlighted to improve visibility and assist in focusing on your current move.`

const keyPoints2 = `Number Pad:
At the bottom of the screen, the number pad allows you to select and input numbers into the grid. Simply tap a desired cell and then tap the number cell in the numberpad.

1 to 9:
Select numbers to input into the Sudoku grid.`

const keyPoints3 = `Undo:
Reverse your last move if you make a mistake or change your mind.

Erase:
Remove a number from a cell if you want to clear it.

Hint:
Get a helpful hint to guide you through a tough spot. This feature can be particularly useful for beginners or when you're stuck.

Pause:
Pause the game at any time and resume when you're ready, ensuring you can play at your own pace.

Restart:
Restart the current puzzle to try again from scratch, ideal for practice and improvement.`


const Help = (props) => {

    const reduxData = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    const handleArrowBack = () => {
        dispatch(StopTimerAction(false));
        props.navigation.navigate('Game');
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, reduxData.dataToggleIcon && styles.backgroundColorDark, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                <TouchableOpacity style={[styles.navigateBack, reduxData.dataToggleIcon && styles.darkElement, reduxData.dataToggleIcon && styles.headerbottomDark]} onPress={() => handleArrowBack()}>
                    <Icons name='arrow-back-circle-outline' size={windowWidth * 0.11} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: windowWidth * 0.065, lineHeight: windowWidth * 0.09, fontFamily: 'Poppins-SemiBold', fontWeight: '500', marginLeft: 4, color: (!reduxData.dataToggleIcon ? 'black' : 'white') }}> Help and Guidelines </Text>
                </View>
            </View>
            <View style={[styles.mainView, reduxData.dataToggleIcon && styles.backgroundColorDark]}>
                <ScrollView style={{ padding: 30 }}>
                    <View style={{ flex: 1}}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, height: 105, width: 105, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: 100, width: 100 }} source={require('../assets/pastime.png')} />
                            </View>
                        </View>
                        <Text style={[styles.headingText, reduxData.dataToggleIcon && styles.textDark]}>
                            About Our Sudoku Game App:
                        </Text>
                        <Text style={[styles.keyPoints, reduxData.dataToggleIcon && styles.textDark]}>
                            Welcome to the ultimate Sudoku experience! Our Sudoku game app is designed to provide both novice and expert players with an engaging and user-friendly interface. Here are the features and functionalities that make our app stand out:
                        </Text>
                        <Text style={[styles.headingText, reduxData.dataToggleIcon && styles.textDark]}>
                            Game Screen Overview:
                        </Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: windowHight * 0.78 }}>
                            <Image style={{ width: '100%' }} resizeMode="contain" source={require('../assets/Game.png')} />
                        </View>
                        <Text style={[styles.keyPoints, reduxData.dataToggleIcon && styles.textDark]}>
                            {keyPoints}
                        </Text>
                        <Text style={[styles.headingText, reduxData.dataToggleIcon && styles.textDark]}>
                            Game Board:
                        </Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: windowHight * 0.52 }}>
                            <Image style={{ width: '100%' }} resizeMode="contain" source={require('../assets/Header.png')} />
                        </View>
                        <Text style={[styles.keyPoints, reduxData.dataToggleIcon && styles.textDark]}>
                            {keyPoints1}
                        </Text>
                        <Text style={[styles.headingText, reduxData.dataToggleIcon && styles.textDark]}>
                            Input Controls:
                        </Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: windowHight * 0.09 }}>
                            <Image style={{ width: '100%' }} resizeMode="contain" source={require('../assets/NumberPad.png')} />
                        </View>
                        <Text style={[styles.keyPoints, reduxData.dataToggleIcon && styles.textDark]}>
                            {keyPoints2}
                        </Text>
                        <Text style={[styles.headingText, reduxData.dataToggleIcon && styles.textDark]}>
                            Additional Functionalities:
                        </Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: windowHight * 0.1 }}>
                            <Image style={{ width: '100%' }} resizeMode="contain" source={require('../assets/Features.png')} />
                        </View>
                        <Text style={[styles.keyPoints, reduxData.dataToggleIcon && styles.textDark]}>
                            {keyPoints3}
                        </Text>
                        <Text style={[styles.headingText, reduxData.dataToggleIcon && styles.textDark]}>
                            Why Choose Our Sudoku Game App?
                        </Text>
                        <Text style={[styles.keyPoints, reduxData.dataToggleIcon && styles.textDark]}>
                            Our Sudoku app is crafted with attention to detail and a focus on user experience. We aim to provide a relaxing yet stimulating environment for all Sudoku enthusiasts. Download our app today and start enjoying the timeless puzzle game loved by millions around the world!
                        </Text>
                        <Text style={{ fontSize: 30, fontFamily: 'Poppins-SemiBold', color: (!reduxData.dataToggleIcon ? '#003366' : 'white'), textAlign: 'left', fontWeight: '500', marginBottom: 80, marginTop: 20 }}>
                            Have a Fun :)
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        // backgroundColor: 'blue',
        paddingLeft: windowWidth * 0.03,
        width: windowWidth,
        height: windowHight * 0.09,
    },
    mainView: {
        flex: 9,
        backgroundColor: '#F5F5F5'
    },
    navigateBack: {
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (windowWidth * 0.11) / 2,
        backgroundColor: '#FFFFFF'
    },
    scrollContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    headingText: {
        lineHeight: windowWidth * 0.087,
        fontFamily: 'Poppins-SemiBold',
        fontSize: windowWidth * 0.07,
        color: 'black',
        textAlign: 'left',
        width: '100%',
        marginTop: windowHight*0.05
    },
    keyPoints: {
        fontFamily: 'Poppins-Regular',
        lineHeight: windowWidth * 0.06,
        fontSize: windowWidth * 0.05,
        color: 'black',
        textAlign: 'justify',
        fontWeight: '500',
        width: '100%',
        marginTop: 10,
    },
    backgroundColorDark: {
        backgroundColor: '#0E0D13'
    },
    darkElement: {
        backgroundColor: '#222431',
    },
    textDark: {
        color: '#F5F5F5'
    },
    developerNameDark: {
        color: 'white'
    },
    headerbottomDark: {
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    }
})

export default Help;